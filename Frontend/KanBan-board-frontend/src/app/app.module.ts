import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatInputModule, MatTooltipModule,
  MatSnackBarModule,MatIconModule, MatProgressSpinnerModule, MatMenuModule, 
} from '@angular/material';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  ModalModule} from 'ngx-bootstrap';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import { TooltipModule, PopoverModule, ButtonsModule, MDBModalService, InputsModule, InputUtilitiesModule } from 'angular-bootstrap-md';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InteractiveFormComponent } from './interactive-form/interactive-form.component';
import { ProjectComponent } from './project/project.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TaskComponent } from './task/task.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { UpdateProjectComponent } from './project/update-project/update-project.component';
import { ErrorComponent } from './error/error.component';
import { UpdateTaskComponent } from './task/update-task/update-task.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    InteractiveFormComponent,
    ProjectComponent,
    CreateProjectComponent,
    KanbanBoardComponent,
    TaskComponent,
    CreateTaskComponent,
    UpdateProjectComponent,
    ErrorComponent,
    UpdateTaskComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    DragDropModule,
    MatSnackBarModule,
    MatMenuModule,
    FormsModule, ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    MatTooltipModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CarouselModule, WavesModule,
    MatTabsModule,MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    
  ],
  providers: [ 
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    

  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  
})
export class AppModule { }
