import { Component, OnInit } from '@angular/core';
import { CreateTask } from '../../model/create-task.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

 var id: string;
@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;

  statusdropdown = ['To Do','In Process','Done'];
  prioritydropdown = ['High','Medium','Low'];
  statusdropdownHasError = false;
  task: CreateTask = {
    taskname: '',
    taskstatus: 'select',
    taskstartdate: '2019-12-30',
    taskduedate: '',
    taskpriority: 'select',
    taskdescription: '',
    id: ''
  }

  isLoading: boolean = false;

  validatestatusdropdown(value){
    if(value === 'select'){
      this.statusdropdownHasError = true;
    } else {
      this.statusdropdownHasError = false;
    }
  }
  constructor(private authService: AuthService, private projectService:ProjectService, private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'YYYY-MM-DD'
      });
    }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      id = params.get('_id');
      console.log(params);
      //localStorage.setItem('taskid', id);
      return this.projectService.getTask(id).then(data => {
        this.task = data;
        localStorage.setItem('taskid', id);
        console.log(data);
      }).catch(err => {
        console.log(err);
      });
    });
  }

  onUpdateTask(taskForm : NgForm){
    if(taskForm.invalid){ return; }
    this.isLoading = true;
    this.projectService.updateTask(taskForm.value);
    // //this.router.navigate(['/kanban-board']);
    console.log(taskForm.value);
    // id = localStorage.getItem('projectval')
    // console.log(id);
    this.router.navigate(['../', {id : id}], {relativeTo: this.activatedRoute});
  }

}
