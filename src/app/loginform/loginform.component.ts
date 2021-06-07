import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent implements OnInit {


  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    public snackBar: MatSnackBar,
    private router: Router,
  ) {

  }
  email: string;
  password: string;
  spin: boolean = false;
  error: string;
  errmsg: string;

  showspin() {
    this.spin = !this.spin
  }


  validate() {
    this.showspin()
    if (!this.email) {
      this.error = 'email'
      this.errmsg = 'Email cannot be left blank'
      this.showspin()
    }
    else if (!this.password) {
      this.error = 'password'
      this.errmsg = 'Email cannot be left blank'
      this.showspin()
    }
    else if (!this.email.includes('@gmail.com')) {
      this.error = 'email'
      this.errmsg = 'Email format invalid'
      this.showspin()
    }
    else {
      this.login()
    }
  }


  login() {
    this.auth.auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
      this.firestore.collection('users').doc(user.user.uid).valueChanges().subscribe((c_user: any) => {

        console.log(c_user);

        if (c_user.userTyp == this.data.user) {
          if (c_user.userTyp == 'Student') {

            this.gotoPage('student-dashboard')

          }
          else if (c_user.userTyp == 'Admin') {

            this.gotoPage('admin-dashboard')
          }
          else if (c_user.userTyp == 'Supervisor') {
            alert(' Not Register or Invalid credentials')
          }
          else if (c_user.userTyp == 'Co-ordinator') {
            alert('Not Register or Invalid credentials')
          }
          else if (c_user.userTyp == 'Staff') {
            alert('Not Register or Invalid credentials')
          }
          else if (c_user.userTyp == 'Evaluator') {
            alert('Not Register or Invalid credentials')
          }
          else {
            this.auth.auth.signOut()
            this.openSnackBar('No user found!!', 3000)
          }
        }
        else {
          this.auth.auth.signOut()
          this.openSnackBar('Please donnot try to login into other"s system!', 3000)
        }

      })
    }).catch((err) => {
      this.openSnackBar(err.message, 3000)
    })
  }

  openSnackBar(message, duration: number) {

    this.snackBar.open(message, '', {
      duration: duration,
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'end', //'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['snack-bar-color'],
    });

    this.showspin()
    this.close()
  }

  gotoPage(pagename) {
    this.router.navigate([pagename]).then(() => {
      this.close()
    })
  }

  close() {
    this.dialog.closeAll()
  }

  ngOnInit(): void {
  }

}
