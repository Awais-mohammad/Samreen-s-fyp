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
]