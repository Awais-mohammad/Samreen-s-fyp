import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-query-management',
  templateUrl: './query-management.component.html',
  styleUrls: ['./query-management.component.scss']
})
export class QueryManagementComponent implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  obtainedQuerries: any;

  getQuerries() {
    this.firestore.collection('querry').valueChanges().subscribe(data => {
      this.obtainedQuerries = data
    })
  }

  ngOnInit(): void {
    this.getQuerries()
  }

}
