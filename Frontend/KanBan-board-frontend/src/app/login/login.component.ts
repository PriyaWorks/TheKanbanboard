import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../model/login.model';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  private authStatusSub: Subscription;
  user : Login = {
    email: '',
    password: ''
  }
  
  constructor(private authService: AuthService,
              private router: Router, private _snackBar: MatSnackBar
              ) { }

  ngOnInit() {
    // this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
    //   authStatus => {
    //     this.isLoading = false;
    //   }
    // );    
    
  }

  onLogin(loginForm: NgForm){
    if(loginForm.invalid){ return; }
    this.isLoading = true;
    this.authService.userLogin(loginForm.value);
    loginForm.resetForm();
      //Snack bar to display confirmation for dept added
        // this.snackBar.open(res['message'], '', {
        // duration: 5000,
        // verticalPosition: 'top'
  } 

}
