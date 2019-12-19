import { Component, OnInit } from '@angular/core';
import { CreateProject } from '../../model/create-project.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  loginname: string;
  datePickerConfig: Partial<BsDatepickerConfig>;
  project: CreateProject = {
    projectname: '',
    projectdescription : '',
	  projectstartdate : '',
	  projectduedate : '',
	  todoworklimit :'',
	  wipworklimit : '',
    doneworklimit :'',
    projectcreator : ''
  };
  isLoading: boolean = false;
  constructor(private projectService:ProjectService,
    private router: Router) { 
      this.datePickerConfig = Object.assign({},
        {
          containerClass: 'theme-dark-blue',
          showWeekNumbers: false
        });
    }

  ngOnInit() {
  }
  onEditProject(projectForm : NgForm){

  }

}
