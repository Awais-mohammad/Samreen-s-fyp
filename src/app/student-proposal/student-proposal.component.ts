import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-student-proposal',
  templateUrl: './student-proposal.component.html',
  styleUrls: ['./student-proposal.component.scss']
})
export class StudentProposalComponent implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private http: HttpClient,
  ) { }

  fileURL: string;
  selectedFiles: FileList;
  currentFile: File;



  /////////upload file to server/////////////////
  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'https://www.exportportal.site/uploaddoc.php', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }


  /////////select file/////////////////
  selectFile(event) {
    console.log('method called');

    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);

    this.fileURL = 'https://exportportal.site/documents/' + this.selectedFiles[0].name
    this.upload()
  }


  /////////upload file/////////////////
  upload() {

    this.currentFile = this.selectedFiles.item(0);
    this.uploadFile(this.currentFile,).subscribe(response => {
      if (response instanceof HttpResponse) {
        alert(response.body);

      }
    });
    return;
  }

  studentData: any;

  getuser() {

    const authSUb = this.auth.authState.subscribe(u => {
      if (u) {
        this.firestore.collection('users').doc(u.uid).get().subscribe(res => {
          if (res == undefined) {

          }
          else {
            console.log('user data=>', res);
            this.studentData = res;
          }
        })
      }
    })

  }

  addProposal() {

  }


  tempmem: any[]
  submit() {

    this.firestore.collection('fyp').valueChanges().subscribe((res: any) => {

      for (var i = 0; i < res.length; i++) {

        console.log('resi', res[i]);

        if (res[i].members) {
          console.log(res[i].members);
          this.tempmem = res[i].members

          for (var k = 0; k < this.tempmem.length; k++) {
            console.log(this.tempmem[k]);

            if (this.tempmem[k].userID == this.studentData.Df.sn.proto.mapValue.fields.userID.stringValue) {

              const fileURL = this.fileURL
              const addedBy = this.studentData.Df.sn.proto.mapValue.fields.name.stringValue
              const parentdocID = res[i].docID
              this.firestore.collection('fyp').doc(parentdocID).collection('proposal').add({
                fileURL, addedBy
              }).then((doc) => {
                const docID = doc.id
                this.firestore.collection('fyp').doc(parentdocID).collection('proposal').doc(doc.id).update({
                  docID
                })
              }).then(() => {
                alert('proposal submiiteddd')
              })

            }

          }


        }

      }


    })

  }

  ngOnInit(): void {
    this.getuser()
  }

}
