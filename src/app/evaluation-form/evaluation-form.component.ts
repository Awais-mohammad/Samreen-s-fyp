import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.scss']
})
export class EvaluationFormComponent implements OnInit {
  public user: string
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
    
  }

 
  

  ngOnInit(): void {
    console.log("EvaluationFormComponent", this.data);
    this.user = this.data.user;
  }

}
