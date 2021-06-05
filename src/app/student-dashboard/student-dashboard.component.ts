import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  constructor() { }
  evaluator: string;
  evaluators: any;
  error: string;
  errormsg: string;

  ngOnInit(): void {
  }

}
