import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-supervisor-dashboard',
  templateUrl: './supervisor-dashboard.component.html',
  styleUrls: ['./supervisor-dashboard.component.scss']
})
export class SupervisorDashboardComponent implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) { }


  userID: string;
  fyps: any;

  getFyps(uid: string) {
    const approved = 'false'
    console.log('userID chec', uid);

    this.firestore.collection('fyp', q => q.where('supervisorID', '==', uid).where('approved', '==', approved)).valueChanges().subscribe(data => {
      if (data.length < 1) {
        console.log('data not foung');

      }
      else {
        this.fyps = data
      }
    })
  }

  approveProj(projID) {
    console.log(projID);

    const approved = 'true'
    this.firestore.collection('fyp').doc(projID).update({
      approved
    }).then(() => {
      alert('fyp approved')
      this.getFyps(this.userID)
    })
  }

  ngOnInit(): void {


    const sub = this.auth.authState.subscribe(user => {
      if (user && user.uid) {
        this.userID = user.uid
        this.getFyps(user.uid)
      }
    })
  }

}
