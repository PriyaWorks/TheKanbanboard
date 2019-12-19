import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { CreateProject } from '../model/create-project.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';
import { CreateTask } from '../model/create-task.model';
import { MatSnackBar } from '@angular/material'; 

var _id: string;
var projectCreatorName: string;
var projectid: string;

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  fullname: string;
  projectid: string;
  _id: string;
  loginname: string;

  constructor(private http:HttpClient, private router: Router, private authService: AuthService,
              private activatedRoute: ActivatedRoute, private snackbar: MatSnackBar) { }

  getTaskOnKanbanBoard(_id): Promise<any>{
    let headers = new HttpHeaders();
    console.log(_id)
    _id = _id;
    return this.http.get('http://localhost:3700/api/project/taskbyprojectid', {
      headers : new HttpHeaders({
        'id' :  _id 
        })
        
    }).toPromise();
 
  }

  createTask(task : CreateTask){
    projectid = localStorage.getItem('projectval')
    console.log(projectid);
    return this.http.post('http://localhost:3700/api/project/addtaskbyprojectid', task, {
      headers : new HttpHeaders({
        'id' : projectid
      })
    }).subscribe(res => { 
      this.snackbar.open(res['message'], '', {
        duration: 5000,
        verticalPosition: 'top'
      })  
    });
  }

  createProject(project : CreateProject){
    projectCreatorName = this.authService.getName();
    //console.log(projectCreatorName);
    return this.http.post('http://localhost:3700/api/project/addproject', project ,{
      headers : new HttpHeaders({
        'projectcreator' : projectCreatorName
        })
    })
    .subscribe(res => {
      this.snackbar.open(res['message'], '', {
      duration: 5000,
      verticalPosition: 'top'
    });
  });
  }

  dashboardForRegisterUser(): Promise<any>{
    this.fullname = this.authService.getName();
    //console.log(this.fullname)
    let headers = new HttpHeaders();
    return this.http.get('http://localhost:3700/api/project/projectbyprojectcreator', {
      headers : new HttpHeaders({
      'projectcreator' : this.fullname
      })
    }).toPromise();
  }

}
