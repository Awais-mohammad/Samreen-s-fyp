import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  evaluator: string;
  evaluators: any[];
  error: string;
  errormsg: string;
  choosed: string;
  studentData: any;
  students: any[]
  choosedpartners: any[] = []
  idea: string;

  getuser() {

    const authSUb = this.auth.authState.subscribe(u => {
      if (u) {
        this.firestore.collection('users').doc(u.uid).get().subscribe(res => {
          if (res == undefined) {

          }
          else {
            console.log('user data=>', res);
            this.studentData = res;
            this.availablepartners()
            this.checkSubmission(u.uid)
          }
        })
      }
    })

  }

  availablepartners() {
    this.firestore.collection('users', q => q.where('batch', '==', this.studentData.Df.sn.proto.mapValue.fields.batch.stringValue)
      .where('shift', '==', this.studentData.Df.sn.proto.mapValue.fields.shift.stringValue)).valueChanges().subscribe((data: any) => {
        if (data.length < 1) {
          console.log('no one found yu ashole');

        }
        else {
          console.log('data got', data);
          this.students = data


        }
      })
  }

  studentchossed(param) {

    console.log(param);

    if (this.choosedpartners.length > 2) {
      alert('max 3 allowed')
    }
    else {
      this.choosedpartners.push(param)
    }

  }
  remove(param) {
    console.log(param);
    this.choosedpartners.splice(param, 1)
  }

  getevaluator() {
    this.firestore.collection('users', q => q.where('userTyp', '==', 'Evaluator')).valueChanges().subscribe(data => {

      if (data.length < 1) {
        console.log('no evaluator found');

      }
      else {
        console.log('evaluator', data);
        this.evaluators = data
      }

    })
  }

  evalchoosed(param) {
    console.log(param);
    this.evaluator = param;
  }

  addfyp() {
    if (!this.evaluator) {
      alert('choose evaluator')
    }
    else if (!this.choosedpartners) {
      alert('choose partner')
    }
    else if (this.choosedpartners.length < 3) {
      alert('choose atleast 3 partners')
    }
    else if (!this.idea) {
      alert('idea??')
    }
    else {

      const evaluator = this.evaluator
      const time = new Date()
      const createdBy = this.studentData.Df.sn.proto.mapValue.fields.name.stringValue
      const members = this.choosedpartners
      const approved = 'false'
      const idea = this.idea
      this.firestore.collection('fyp').add({
        evaluator, time, members, createdBy, approved, idea
      }).then((doc) => {
        const docID = doc.id
        this.firestore.collection('fyp').doc(doc.id).update({
          docID
        }).then(() => {
          this.groupformation = true
        })
      })

    }
  }

  tempmem: any[]
  groupformation: boolean = false;

  checkSubmission(userID: string) {

    this.firestore.collection('fyp').valueChanges().subscribe((res: any) => {

      for (var i = 0; i < res.length; i++) {

        console.log('resi', res[i]);

        if (res[i].members) {
          console.log(res[i].members);
          this.tempmem = res[i].members

          for (var k = 0; k < this.tempmem.length; k++) {
            console.log(this.tempmem[k]);

            if (this.tempmem[k].userID == this.studentData.Df.sn.proto.mapValue.fields.userID.stringValue) {
              this.groupformation = true
            }

          }


        }

      }


    })

  }

  ngOnInit(): void {
    this.getuser()
    this.getevaluator()
  }

}
