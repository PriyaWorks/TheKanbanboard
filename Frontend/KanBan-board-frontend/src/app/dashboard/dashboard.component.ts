import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Project } from '../model/project.model';
import { MdbBtnDirective } from 'angular-bootstrap-md';
import {TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loginname: string;
  projectBoardId: string;
  projectname: string;

  projects: Project = {
    projectname: '',
	projectstartdate : '',
	projectduedate : '',
	_id: '',
  };

  constructor(private projectService : ProjectService, private authService: AuthService,
    private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.projectService.dashboardForRegisterUser().then( data => {
      this.projects = data;
      console.log(data);      
    }).catch(err => {
    console.log(err);
  });
  // this.activatedRoute.paramMap.subscribe(params => {
  //   console.log(params);
  // });
  
  }
    
  // goToKanbanBoard(){
  //   this.router.navigate([this.projects._id], { relativeTo: this.activatedRoute});
  // }

}
