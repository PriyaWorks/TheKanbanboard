import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../model/login.model';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  user : Login = {
    email: '',
    password: ''
  }
  
  constructor(private authService: AuthService,
              private router: Router,
              ) { }

  ngOnInit() {
    
  }

  // closeModal() {
  //   this.activeModal.close('Modal Closed');
  // }

  onLogin(loginForm: NgForm){
    if(loginForm.invalid){ return; }
    this.isLoading = true;
    this.authService.userLogin(loginForm.value);
    //this.router.navigate(['/dashboard']);
      //this.resetForm(userForm);
      //Snack bar to display confirmation for dept added
        // this.snackBar.open(res['message'], '', {
        // duration: 5000,
        // verticalPosition: 'top'
  }
 

}
