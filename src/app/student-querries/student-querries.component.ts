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
    private firebaseauth: AngularFireAuth,
    private http: HttpClient,
  ) { }

  imageURL: string;
  selectedFiles: FileList;
  currentFile: File;
  
  ngOnInit(): void {
  }


  /////////upload file to server/////////////////
  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'https://www.exportportal.site/uploadimage.php', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
  

  /////////select file/////////////////
  selectFile(event) {
    console.log('method called');

    this.selectedFiles = event.target.files;

    this.imageURL = 'https://www.exportportal.site/vendors/' + this.selectedFiles[0].name
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


}
