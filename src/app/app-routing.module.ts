import { SupervisorDashboardComponent } from './supervisor-dashboard/supervisor-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { EvaluatorDashboardComponent } from './evaluator-dashboard/evaluator-dashboard.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthenticationComponent } from './authentication/authentication.component';

const routes: Routes = [
  {
    path: "authentication",
    component: AuthenticationComponent
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent

  },
  {
    path: "",
    redirectTo: "authentication",
    pathMatch: "full"
  },
  {
    path: "student-dashboard",
    component: StudentDashboardComponent,
  },
  {
    path: "staff-dashboard",
    component: StaffDashboardComponent,
  },
  {
    path: "evaluator-dashboard",
    component: EvaluatorDashboardComponent,
  },
  {
    path: "teacher-dashboard",
    component: TeacherDashboardComponent,
  },
  {
    path: "supervisor-dashboard",
    component: SupervisorDashboardComponent,
  }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  AuthenticationComponent,
  AdminDashboardComponent,
  StudentDashboardComponent,
  TeacherDashboardComponent, SupervisorDashboardComponent,
  StaffDashboardComponent, EvaluatorDashboardComponent,
]