import { Component, OnInit } from '@angular/core';
import { Register } from '../model/register.model';
import { AuthService } from '../services/auth.service';

let fname: string;
let lname: string;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registername: string;
  createUser : Register = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  isLoading = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.registername = this.authService.getRegistername();
    // console.log(this.registername);
  }

  onRegister(userForm){
    fname = (<HTMLInputElement> document.getElementById("firstname")).value
    console.log(fname);
    //localStorage.setItem('fname', fname);
    lname = (<HTMLInputElement> document.getElementById("lastname")).value
    //localStorage.setItem('lname', lname);
    if(userForm.invalid){ return; }
    this.isLoading = true;
    this.authService.createUser(userForm.value);
  }

}
