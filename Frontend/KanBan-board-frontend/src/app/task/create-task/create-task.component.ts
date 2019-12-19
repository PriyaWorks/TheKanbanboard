import { Component, OnInit } from '@angular/core';
import { CreateTask } from '../../model/create-task.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;

  statusdropdown = ['To Do','In-Process','Done'];
  prioritydropdown = ['High','Medium','Low'];
  statusdropdownHasError = false;
  task: CreateTask = {
    taskname: '',
    taskstatus: 'select',
    taskstartdate: '',
    taskduedate: '',
    taskpriority: 'select',
    taskdescription: '',
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
        showWeekNumbers: false
      });
    }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('_id');
      console.log(id);
      
    });
    
    }
  

  onCreateTask(taskForm : NgForm){
    if(taskForm.invalid){ return; }
    this.isLoading = true;
    this.projectService.createTask(taskForm.value);
    this.router.navigate(['/kanban-board/:_id']);
    console.log(taskForm.value);
  }

}
