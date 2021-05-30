import { CreateuserformComponent } from './../createuserform/createuserform.component';
import { LoginformComponent } from './../loginform/loginform.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  @ViewChild("search") searchField: ElementRef;

  constructor(private router: Router,
    private dialog: MatDialog,) {

    this.currentDiv = 'Dashboard'

  }
  a: string

  formtest() {
    alert(' clicked' + 'valye is ' + this.searchField.nativeElement.value)
  }
  openDialog(uTyp: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '700px';
    dialogConfig.width = '500px';
    dialogConfig.data = {
      user: uTyp,
    };
    this.dialog.open(CreateuserformComponent, dialogConfig);
  }
  currentDiv: string;

  manage(uType: string) {
    this.currentDiv = uType
  }

  ngOnInit(): void {
  }

}
