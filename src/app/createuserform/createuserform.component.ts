import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-createuserform',
  templateUrl: './createuserform.component.html',
  styleUrls: ['./createuserform.component.scss']
})
export class CreateuserformComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close() {
    this.dialog.closeAll()
  }
  
  ngOnInit(): void {
  }

}
