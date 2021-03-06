import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EvaluationFormComponent } from "../evaluation-form/evaluation-form.component";

@Component({
  selector: 'app-evaluator-dashboard',
  templateUrl: './evaluator-dashboard.component.html',
  styleUrls: ['./evaluator-dashboard.component.scss']
})
export class EvaluatorDashboardComponent implements OnInit {

  constructor(private dialog: MatDialog,) { }

  
  openDialog(data: object) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '700px';
    dialogConfig.width = '500px';
    dialogConfig.data = data;
    this.dialog.open(EvaluationFormComponent, dialogConfig);
  }

  ngOnInit(): void {
  }

}
