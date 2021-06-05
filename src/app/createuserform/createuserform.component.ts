import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-createuserform',
  templateUrl: './createuserform.component.html',
  styleUrls: ['./createuserform.component.scss']
})
export class CreateuserformComponent implements OnInit {

  constructor
    (
      private dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private firestore: AngularFirestore,
      private auth: AngularFireAuth,
      public snackBar: MatSnackBar,
      private router: Router,
      @Inject(DOCUMENT) private _document: Document,

  ) {
    console.log(new Date().getFullYear());
  }

  /*Variables */
  name: string;
  email: string;
  phone: any;
  password: string;
  role: string = this.data.user
  createdAt: any = new Date()
  error: string;
  errormsg: string;
  spin: boolean = false;
  shifts: string[] = ['Morning', 'Evening']
  regNo: string;
  choosedShit: string;

  showspin() {
    this.spin = !this.spin
  }

  validation() {
    this.showspin()
    if (!this.email) {
      this.error = 'email'
      this.errormsg = 'Email cannot be left blank'

      this.showspin()
    }
    else if (!this.password) {
      this.error = 'password'
      this.errormsg = 'Password cannot be left blank'

      this.showspin()
    }
    else if (!this.phone) {
      this.error = 'phone'
      this.errormsg = 'Phone number cannot be left blank'

      this.showspin()
    }
    else if (!this.name) {
      this.error = 'name'
      this.errormsg = 'Name cannot be left blank'

      this.showspin()
    }
    else if (!this.email.includes('@gmail.com')) {
      this.error = 'email'
      this.errormsg = 'Invalid email format'

      this.showspin()
    }
    else if (!this.regNo && this.data.user == 'Student') {
      this.error = 'regno'
      this.errormsg = 'reg no cannot be empty'

      this.showspin()
    }
    else if (!this.choosedShit && this.data.user == 'Student') {
      this.error = 'shift'
      this.errormsg = 'Choose student shift'

      this.showspin()
    }
    else {


      this.createUser()
    }
  }

  createUser() {

    const auth = this.auth.authState.subscribe(user => {
      if (user && user.uid) {
        this.firestore.collection('users').doc(user.uid).get().subscribe((data: any) => {
          this.currentUserData = data
     
          this.useremail = data._delegate._document.data.value.mapValue.fields.email.stringValue;
          this.userpassword = data._delegate._document.data.value.mapValue.fields.password.stringValue

     
          if (this.data.user == 'Student') {
            const name = this.name;
            const email = this.email;
            const password = this.password;
            const phone = this.phone;
            const userTyp = this.role;
            const timestamp = this.createdAt
            const year = new Date().getFullYear()
            const regNo = this.regNo
            const shift = this.choosedShit;

            this.auth.createUserWithEmailAndPassword(this.email, this.password).then((user) => {
              console.log(user.user.uid);
              const userID = user.user.uid
              this.firestore.collection('users').doc(user.user.uid).set({
                name, email, password, phone, userTyp, timestamp, year, regNo, shift, userID
              }).then(() => {
                this.openSnackBar(userTyp + ' created successfully at ' + timestamp, 3000)

                this.auth.signOut().then(() => {
                  this.auth.signInWithEmailAndPassword(this.useremail, this.userpassword).then(() => {
                    this.refreshPage()
                  })
                })

              }).catch((err) => {
                this.openSnackBar('error' + err.message, 3000)
                this.showspin()
              })
            }).catch((err) => {
              this.openSnackBar('error' + err.message, 3000)
              this.showspin()
            })

          }
          else {
            const name = this.name;
            const email = this.email;
            const password = this.password;
            const phone = this.phone;
            const userTyp = this.role;
            const timestamp = this.createdAt
            const year = new Date().getFullYear()
            this.auth.createUserWithEmailAndPassword(this.email, this.password).then((user) => {
              console.log(user.user.uid);
              const userID = user.user.uid

              this.firestore.collection('users').doc(user.user.uid).set({
                name, email, password, phone, userTyp, timestamp, year, userID
              }).then(() => {

                this.auth.signOut().then(() => {
                  this.auth.signInWithEmailAndPassword(this.useremail, this.userpassword).then(() => {
                    this.refreshPage()
                  })
                })
                this.openSnackBar(userTyp + ' created successfully at ' + timestamp, 3000)

              }).catch((err) => {
                this.openSnackBar('error' + err.message, 3000)
                this.showspin()
              })
            }).catch((err) => {
              this.openSnackBar('error' + err.message, 3000)
              this.showspin()
            })
          }

        })
      }
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


  close() {
    this.dialog.closeAll()
  }


  currentUserData: any;

  getCurrentUser() {

  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }
  useremail: string;
  userpassword: string;
  ngOnInit(): void {




  }

}
