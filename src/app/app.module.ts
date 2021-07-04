import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
/*
Angular material imports
*/

import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginformComponent } from './loginform/loginform.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { CreateuserformComponent } from './createuserform/createuserform.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
/*
firebase imports
*/

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ProjectProposalsComponent } from './project-proposals/project-proposals.component';
import { SupervisionGroupsComponent } from './supervision-groups/supervision-groups.component';
import { AssignEvaluatorsComponent } from './assign-evaluators/assign-evaluators.component';
import { SupervisionGroupdetailComponent } from './supervision-groupdetail/supervision-groupdetail.component';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { EvaluationGroupdetailComponent } from './evaluation-groupdetail/evaluation-groupdetail.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginformComponent,
    MainNavComponent,
    CreateuserformComponent,
    ProjectProposalsComponent,
    SupervisionGroupsComponent,
    AssignEvaluatorsComponent,
    SupervisionGroupdetailComponent,
    EvaluationFormComponent,
    ProjectDetailComponent,
    EvaluationGroupdetailComponent,
    
    
 

  ],
  entryComponents: [LoginformComponent, CreateuserformComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    LayoutModule,
    MatToolbarModule,
    MatTableModule,
    MatSnackBarModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatChipsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
