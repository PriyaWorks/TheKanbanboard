import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { CreateProject } from '../model/create-project.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';
import { CreateTask } from '../model/create-task.model';

var id: string;

@Injectable({
  providedIn: 'root'
})


export class ProjectService {

  fullname: string;
  projectid: string;
  _id: string;
  loginname: string;

  constructor(private http:HttpClient, private router: Router, private authService: AuthService,
              private activatedRoute: ActivatedRoute) { }

  getTaskOnKanbanBoard(_id): Promise<any>{
    let headers = new HttpHeaders();
    console.log(_id)
    id = _id;
    return this.http.get('http://localhost:3700/api/project/taskbyprojectid', {
      headers : new HttpHeaders({
        'id' :  id 
        })
        
    }).toPromise();
 
  }

  createTask(task : CreateTask){
    return this.http.post('http://localhost:3700/api/project/addtaskbyprojectid/?projectid=' + id, task)
      .subscribe(res => { console.log(res); });
  }

  createProject(project : CreateProject){
    return this.http.post('http://localhost:3700/api/project/addproject', project)
    .subscribe(res => {
      console.log(res);
    });
  }

  dashboardForRegisterUser(): Promise<any>{
    this.fullname = this.authService.getName();
    //console.log(this.authService.getRegistername())
    //console.log(this.authService.getLoginName())
    // if(this.fullname == null){
    //     this.fullname = this.authService.getLoginName();
    // } 
    console.log(this.fullname)
    let headers = new HttpHeaders();
    return this.http.get('http://localhost:3700/api/project/projectbyprojectcreator', {
      headers : new HttpHeaders({
      'projectcreator' : this.fullname
      })
    }).toPromise();
  }

}
