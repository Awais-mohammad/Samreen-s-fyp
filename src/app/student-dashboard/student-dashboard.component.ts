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

  evaluator: any;
  evaluators: any[];
  error: string;
  errormsg: string;
  choosed: string;
  studentData: any;
  students: any[]
  choosedpartners: any[] = []
  idea: string;
  degree: string[] = ['Software', 'ComputerScience', 'Information Technology']

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
      .where('shift', '==', this.studentData.Df.sn.proto.mapValue.fields.shift.stringValue)
      .where('program', '==', this.studentData.Df.sn.proto.mapValue.fields.program.stringValue)).valueChanges().subscribe((data: any) => {
        if (data.length < 1) {
          console.log('no one found');

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

  getsupervior() {
    this.firestore.collection('users', q => q.where('userTyp', '==', 'Supervisor')).valueChanges().subscribe(data => {

      if (data.length < 1) {
        console.log('no supervisor found');

      }
      else {
        console.log('supervisor', data);
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
      alert('choose supervisor')
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
    else if (!this.choosedprogram) {
      alert('program...,')
    }
    else {

      const supervisorname = this.evaluator.name
      const supervisorID = this.evaluator.userID
      const time = new Date()
      const createdBy = this.studentData.Df.sn.proto.mapValue.fields.name.stringValue
      const members = this.choosedpartners
      const approved = 'false'
      const idea = this.idea
      const program = this.programChoosed
      this.firestore.collection('fyp').add({
        supervisorname, supervisorID, time, members, createdBy, approved, idea, program,
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
  programChoosed: string;
  stat: boolean = false;

  choosedprogram(val) {
    this.programChoosed = val
    console.log(this.programChoosed);

  }

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

              if (res[i].approved == 'true') {

                this.stat = true
                this.groupformation = false
              }
              else {
                this.groupformation = true
                this.stat = false
              }
            }

          }


        }

      }


    })

  }

  ngOnInit(): void {
    this.getuser()
    this.getsupervior()


  }

}
