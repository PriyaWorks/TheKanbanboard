import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from '../model/task.model';
import { ProjectService } from '../services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
//import 'rxjs/add/observable/combineLatest';

var _id: string;
var projectval: string;
var id: string;

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {
  projectname: string;
  status: string;
  
   taskStatus: string;
  tasks: Task = {
    id: '',
    _id: '',
    taskname: '',
    taskstatus: '',
    taskstartdate: '',
    taskduedate: ''
  }

  constructor(private activatedRoute: ActivatedRoute,
              private projectService: ProjectService,
              private router: Router, private authService: AuthService
   ) { }

  ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe(params => {
      _id = params.get('id');
      console.log(params);
      localStorage.setItem('projectval', _id)
      return this.projectService.getTaskOnKanbanBoard(_id).then(data => {
        this.tasks = data.tasks;
        //localStorage.setItem('_id', _id);
        console.log(data);
      }).catch(err => {
        console.log(err);
      });
    });
    
  }
  goToCreateTask(){
    id = localStorage.getItem('projectval')
    console.log(id);
    this.router.navigate(['kanban-board/create-task',id]);
  }

}
