import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InteractiveFormComponent } from './interactive-form/interactive-form.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { AuthGuard } from './services/auth.gaurd';
import { UpdateProjectComponent } from './project/update-project/update-project.component';
import { UpdateTaskComponent } from './task/update-task/update-task.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard]},
  { path: 'iteractive-form', component: InteractiveFormComponent,  canActivate: [AuthGuard]},
  { path: 'project/create-project', component: CreateProjectComponent, canActivate: [AuthGuard]},
  { path: 'project/update-project/:_id', component: UpdateProjectComponent, canActivate: [AuthGuard]},
  { path: 'kanban-board/:id', component: KanbanBoardComponent, canActivate: [AuthGuard]},
  { path: 'kanban-board/create-task/:projectid', component: CreateTaskComponent, canActivate: [AuthGuard]},
  { path: 'kanban-board/update-task/:_id', component: UpdateTaskComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
