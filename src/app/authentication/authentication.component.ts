import { LoginformComponent } from './../loginform/loginform.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog,

  ) { }



  openDialog(uTyp: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '500px';
    dialogConfig.width = '500px';
    dialogConfig.data = {
      user: uTyp,
    };
    this.dialog.open(LoginformComponent, dialogConfig);
  }

  ngOnInit(): void {
  }

}
