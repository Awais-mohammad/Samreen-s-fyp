import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import * as firebase from 'firebase/app'

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
  batches: string[] = ['183', '201', '333']
  choosedbatch: string;

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
    else if (!this.choosedbatch && this.data.user == 'Student') {
      this.error = 'batch'
      this.errormsg = 'choose a batch'
      this.showspin()
    }
    else {


      this.createUser()
    }
  }

  createUser() {

    console.log('in here');
    
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
      const batch = this.choosedbatch
      var config = {
        apiKey: "AIzaSyDnwsMEwSY3DZ7ja5RB200xN1lTvjpFyI4",
        authDomain: "moveme-23586.firebaseapp.com",
        databaseURL: "https://moveme-23586.firebaseio.com",
        projectId: "moveme-23586",
        storageBucket: "moveme-23586.appspot.com",
        messagingSenderId: "851612163631",
        appId: "1:851612163631:web:bda512c8099717030ff0da",
        measurementId: "G-J7PGETBY2V"
      };

      var secondApp = firebase.initializeApp(config, "secondary")
      secondApp.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
        console.log();
        console.log(user.user.uid);
        const userID = user.user.uid
        this.firestore.collection('users').doc(user.user.uid).set({
          name, email, password, phone, userTyp, timestamp, year, regNo, shift, userID, batch
        }).then(() => {
          this.openSnackBar(userTyp + ' created successfully at ' + timestamp, 3000)



        }).catch((err) => {
          this.openSnackBar('error' + err.message, 3000)
          this.showspin()
        })
      }).then(() => {
        console.log('new user logged out');

        secondApp.auth().signOut()
      }).then(() => {
        secondApp.delete()

        console.log('Session off');
      })

    }
    else {
      console.log('tadak bro tadak');

      const name = this.name;
      const email = this.email;
      const password = this.password;
      const phone = this.phone;
      const userTyp = this.role;
      const timestamp = this.createdAt
      const year = new Date().getFullYear()

      var config = {
        apiKey: "AIzaSyDnwsMEwSY3DZ7ja5RB200xN1lTvjpFyI4",
        authDomain: "moveme-23586.firebaseapp.com",
        databaseURL: "https://moveme-23586.firebaseio.com",
        projectId: "moveme-23586",
        storageBucket: "moveme-23586.appspot.com",
        messagingSenderId: "851612163631",
        appId: "1:851612163631:web:bda512c8099717030ff0da",
        measurementId: "G-J7PGETBY2V"
      };

      var secondApp = firebase.initializeApp(config, "secondary")
      secondApp.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
        console.log();
        console.log(user.user.uid);
        const userID = user.user.uid

        this.firestore.collection('users').doc(user.user.uid).set({
          name, email, password, phone, userTyp, timestamp, year, userID
        }).then(() => {

          this.openSnackBar(userTyp + ' created successfully at ' + timestamp, 3000)
          this.showspin()
        }).catch((err) => {
          this.openSnackBar('error' + err.message, 3000)
          this.showspin()
        })
      }).then(() => {
        console.log('new user logged out');

        secondApp.auth().signOut()
      }).then(() => {
        secondApp.delete()

        console.log('session fucked off');
      })


    }





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
