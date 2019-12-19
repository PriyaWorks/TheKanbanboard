import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateProject } from '../model/create-project.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../services/project.service';

let ques1: string;
let ques2: string;
let ques3: string;
let ques4: string;
let ques5: string;
let ques6: string;
let name: string;
let projectid: string;
project: {
  projectname: String 
  projectdescription: String
  projectstartdate : String
  projectduedate : String
  todoworklimit : String
  wipworklimit : String
  projectcreator : String
}

@Component({
  selector: 'app-interactive-form',
  templateUrl: './interactive-form.component.html',
  styleUrls: ['./interactive-form.component.css']
})
export class InteractiveFormComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;
  firstname: string;
  lastname: string;
 fullname: string;
 
  project: CreateProject = {
    projectname: '',
    projectdescription : '',
	  projectstartdate : '',
	  projectduedate : '',
	  todoworklimit :'',
	  wipworklimit : '',
    doneworklimit :'',
    projectcreator : ''
  }
  isShow1 = true;
  isShow2 = false;
  isShow3 = false;
  isShow4 = false;
  isShow5 = false;
  isShow6 = false;
  isShow7 = false;
  
  constructor(private authService: AuthService, private projectService:ProjectService,
    private router: Router) {
      
     this.datePickerConfig = Object.assign({},
       {
         containerClass: 'theme-dark-blue',
         showWeekNumbers: false
       });
    }

  ngOnInit() {
    name = this.authService.getName();
    //console.log(name);
    this.firstname = localStorage.getItem('firstname').toUpperCase();
    this.lastname = localStorage.getItem('lastname').toUpperCase();
  }

  onNext1(){
    //console.log(pr.value);
    ques1 = (<HTMLInputElement> document.getElementById("projectname")).value
    console.log(ques1)
    return this.isShow1 = false, this.isShow2 = true;
  }
  onNext2(){
    // this.ques1 = (<HTMLInputElement> document.getElementById("projectname")).value
    ques2 = (<HTMLInputElement> document.getElementById("projectdescription")).value
    console.log(ques2)
    return this.isShow2 = false, this.isShow3 = true;
  }
  onNext3(){
    ques3 = (<HTMLInputElement> document.getElementById("projectstartdate")).value
    console.log(ques3)
    return this.isShow3 = false, this.isShow4 = true;
  }
  onNext4(){
    ques4 = (<HTMLInputElement> document.getElementById("projectduedate")).value
    console.log(ques4)
    return this.isShow4 = false, this.isShow5 = true;
  }
  onNext5(){
    ques5 = (<HTMLInputElement> document.getElementById("todoworklimit")).value
    console.log(ques5)
    return this.isShow5 = false, this.isShow6 = true;
  }
  onNext6(){
    ques6 = (<HTMLInputElement> document.getElementById("wipworklimit")).value
    console.log(ques6)
    return this.isShow6 = false, this.isShow7 = true;
  }
  onNext7(){
    
  }
  
  onCreateProject(projectForm : NgForm){
    
    this.project.projectname = ques1
    this.project.projectdescription = ques2;
    this.project.projectstartdate = ques3;
    this.project.projectduedate = ques4;
    this.project.todoworklimit = ques5;
    this.project.wipworklimit = ques6;
    this.project.projectcreator = name;
    console.log(this.project)
    this.projectService.createProject(this.project);
    
    this.router.navigate(['/dashboard']);
  }

}
