import { QueryManagementComponent } from './query-management/query-management.component';
import { CordinatorDashboardComponent } from './cordinator-dashboard/cordinator-dashboard.component';
import { AssignEvaluatorsComponent } from './assign-evaluators/assign-evaluators.component';
import { StudentProposalComponent } from './student-proposal/student-proposal.component';
import { StudentQuerriesComponent } from './student-querries/student-querries.component';
import { SupervisorDashboardComponent } from './supervisor-dashboard/supervisor-dashboard.component';
import { ProjectProposalsComponent } from './project-proposals/project-proposals.component';
import { SupervisionGroupsComponent } from './supervision-groups/supervision-groups.component';
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
    path: "supervisor-dashboard",
    component: SupervisorDashboardComponent,
  },
  {
    path: "student-querries",
    component: StudentQuerriesComponent,
  }, 
  
  {
    path: 'student-proposal',
    component: StudentProposalComponent
  }, 
  
  {
    path: 'cordinator-dashboard',
    component: CordinatorDashboardComponent
  },

  {
    path: 'assign-evaluators',
    component: AssignEvaluatorsComponent
  },


  {
    path: 'query-management',
    component: QueryManagementComponent
  },
  {
    path: 'project-proposals',
    component: ProjectProposalsComponent
  },

{
    path: 'supervision-groups',
    component: SupervisionGroupsComponent
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
  SupervisorDashboardComponent,
  StaffDashboardComponent, EvaluatorDashboardComponent,
  StudentQuerriesComponent,
  StudentProposalComponent,
  CordinatorDashboardComponent,
  QueryManagementComponent,
]