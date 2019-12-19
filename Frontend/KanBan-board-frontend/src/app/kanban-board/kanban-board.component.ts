import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from '../model/task.model';
import { ProjectService } from '../services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {

  status: string;
  _id: string;
   taskStatus: string;
  tasks: Task = {
    _id: '',
    taskname: '',
    taskstatus: '',
    taskstartdate: '',
    taskduedate: ''
  }

  constructor(private activatedRoute: ActivatedRoute,
              private projectService: ProjectService,
              private router: Router
   ) { }

  ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('_id');
      console.log(id);
      return this.projectService.getTaskOnKanbanBoard(id).then(data => {
        this.tasks = data;
        console.log(data);
      }).catch(err => {
        console.log(err);
      });
    });
    
    } 

}
