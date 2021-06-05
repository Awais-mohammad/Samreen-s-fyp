import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateuserformComponent } from './../createuserform/createuserform.component';
import { LoginformComponent } from './../loginform/loginform.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  @ViewChild("search") searchField: ElementRef;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    public snackBar: MatSnackBar,
  ) {

    this.currentDiv = 'Dashboard'

  }
  a: string

  formtest() {
    alert(' clicked' + 'valye is ' + this.searchField.nativeElement.value)
  }
  openDialog(uTyp: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '700px';
    dialogConfig.width = '500px';
    dialogConfig.data = {
      user: uTyp,
    };
    this.dialog.open(CreateuserformComponent, dialogConfig);
  }


  currentDiv: string;
  admins: any;
  students: any;
  cordinators: any;
  staffs: any;
  evaluators: any;
  supervisors: any;


  manage(uType: string) {
    this.currentDiv = uType

    if (this.currentDiv == 'Admin') {
      this.Admins()
    }
    else if (this.currentDiv == 'Staff') {
      this.staff()
    }
    else if (this.currentDiv == 'Supervisor') {
      this.supervisor()
    }
    else if (this.currentDiv == 'Co-ordinator') {
      this.cordinator()
    }
    else if (this.currentDiv == 'Student') {
      this.Students()
    }
    else if (this.currentDiv == 'Evaluator') {
      this.evaluator()
    }


  }

  openSnackBar(message, duration: number) {

    this.snackBar.open(message, '', {
      duration: duration,
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'end', //'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['snack-bar-color'],
    });

  }


  staff() {
    this.firestore.collection('users', q => q.where('userTyp', '==', 'Staff')).valueChanges().subscribe((staff: any) => {
      console.log('staff are=>', staff);
      this.staffs = staff
    })
  }

  evaluator() {
    this.firestore.collection('users', q => q.where('userTyp', '==', 'Evaluator')).valueChanges().subscribe((evaluator: any) => {
      console.log('evaluator are=>', evaluator);
      this.evaluators = evaluator
    })
  }

  supervisor() {
    this.firestore.collection('users', q => q.where('userTyp', '==', 'Supervisor')).valueChanges().subscribe((supervisor: any) => {
      console.log('supervisor are=>', supervisor);
      this.supervisors = supervisor
    })
  }


  Admins() {
    this.firestore.collection('users', q => q.where('userTyp', '==', 'Admin')).valueChanges().subscribe((admin: any) => {
      console.log('Admins are=>', admin);
      this.admins = admin
    })
  }

  Students() {
    this.firestore.collection('users', q => q.where('userTyp', '==', 'Student')).valueChanges().subscribe((student: any) => {
      console.log('Students are=>', student);
      this.students = student
    })
  }

  cordinator() {
    this.firestore.collection('users', q => q.where('userTyp', '==', 'Co-ordinator')).valueChanges().subscribe((cordinator: any) => {

      this.cordinators = cordinator
      console.log('ordinator are=>', this.cordinators);
    })
  }

  deleteuser(id: string) {
    console.log(id);

    this.firestore.collection('users').doc(id).delete().then(() => {
      this.openSnackBar('User deleted successfully', 1500)
    }).catch(err => {
      this.openSnackBar(err.message, 1500)
    })
  }

  ngOnInit(): void {

  }

}
