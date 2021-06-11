import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})
export class StaffDashboardComponent implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  alldata: any;

  getAll() {
    this.firestore.collection('querry').valueChanges().subscribe(data => {
      this.alldata = data
      console.log(this.alldata);

    })
  }

  ngOnInit(): void {
    this.getAll()
  }

}
