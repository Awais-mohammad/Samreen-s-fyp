import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-querries',
  templateUrl: './student-querries.component.html',
  styleUrls: ['./student-querries.component.scss']
})
export class StudentQuerriesComponent implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private http: HttpClient,
  ) { }

  fileURL: string;
  selectedFiles: FileList;
  currentFile: File;

  ngOnInit(): void {
    this.getuser()
  }


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

  addQuerry(typ) {

    if (!this.fileURL) {
      alert('choose a file')
    }

    else {
      const queryFrom = this.studentData.Df.sn.proto.mapValue.fields.name.stringValue
      const queriedAt = new Date()
      const file = this.fileURL
      const queryFor = typ
      this.firestore.collection('querry').add({
        queryFrom,
        queriedAt,
        file,
        queryFor
      }).then((doc) => {
        const docID = doc.id
        this.firestore.collection('querry').doc(doc.id).update({
          docID
        }).then(() => {
          alert('querry added')
        })
      })
    }
  }


}
