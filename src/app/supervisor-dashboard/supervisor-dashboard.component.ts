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

  getFyps() {
    const approved = false
    this.firestore.collection('fyp', q => q.where('supervisorID', '==', this.userID).where('approved', '==', approved)).valueChanges().subscribe(data => {
      this.fyps = data
    })
  }

  approveProj(projID) {
    console.log(projID);

    const approved = true
    this.firestore.collection('fyp').doc(projID).update({
      approved
    }).then(() => {
      alert('fyp approved')
      this.getFyps()
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.userID = this.auth.auth.currentUser.uid
      console.log(this.userID);
      this.getFyps()
    }, 2000);
  }

}
