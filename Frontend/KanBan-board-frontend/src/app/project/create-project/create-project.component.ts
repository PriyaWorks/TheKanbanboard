import { Component, OnInit } from '@angular/core';
import { CreateProject } from '../../model/create-project.model';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
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
  constructor(private authService: AuthService, private projectService:ProjectService,
    private router: Router) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'MM/DD/YYYY'
      });
   }

  ngOnInit() {
   this.loginname = this.authService.getName();
  }
  onCreateProject(projectForm: NgForm){
    if(projectForm.invalid){ return; }
    this.isLoading = true;
  
    this.project.projectcreator = this.loginname;
    console.log(this.loginname);
    console.log(this.project);
    this.projectService.createProject(projectForm.value);
    this.router.navigate(['/dashboard']);
  }
}
