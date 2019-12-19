import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Register } from '../model/register.model';
import { Login } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean = false; 
  private tokenTimer:  any;
  private lastname: string;
  private firstname: string;
  private lname: string;
  private fname: string;
  private name: string;
  private projectid: string;
  private loginName: string;

  constructor(private http: HttpClient,
              private router: Router) { }

  getToken(){ return this.token; }
  getFirstName(){ return this.firstname; }
  getLastName(){ return this.lastname; }
  getName(){
    this.name = this.firstname + this.lastname;
    return this.name;
  }
  getIsAuth(){ return this.isAuthenticated; }
  getAuthStatusListener(){ return this.authStatusListener.asObservable(); }
  // getRegistername(){ 
  //   this.fname = localStorage.getItem('fname');
  //   //console.log(this.fname);
  //   this.lname = localStorage.getItem('lname');
  //   //console.log(this.lname)
  //   this.name = this.fname + this.lname;
  //   console.log(this.name)
  //   return this.name; 
  // }
  // getProjectId(){
  //   this.projectid = localStorage.getItem('projectid');
  //   console.log(this.projectid);
  //   return this.projectid;
    
  // }

  createUser(user : Register ){
    this.http.post<{token: string, expiresIn: number, firstname: string, lastname: string,
                    }>('http://localhost:3700/api/user/register', user)
                    .subscribe(res => {
                      const token = res.token;
                      this.token = token;
                      console.log(token);
                      if(token){
                        const expiresInDuration = res.expiresIn;
                        this.setAuthTimer(expiresInDuration); 
                                 
                        this.firstname = res.firstname;
                        console.log(this.firstname); 
                        this.lastname = res.lastname;
                        console.log(this.lastname);         
                        this.isAuthenticated = true;
                        this.authStatusListener.next(true);
                        const now = new Date();
                        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                        //console.log(expirationDate);
                        this.saveAuthData(token, expirationDate, this.lastname, this.firstname);
                        this.router.navigate(['/iteractive-form'])
                      }
                    });
  }

  userLogin(login : Login){
    this.http.post<{token: string, expiresIn: number, firstname: string, lastname: string,
                    }>('http://localhost:3700/api/user/login', login)
      .subscribe(res => {
        const token = res.token;
        this.token = token;
        console.log(token);
        if(token){
          const expiresInDuration = res.expiresIn;
          this.setAuthTimer(expiresInDuration); 
                   
          this.firstname = res.firstname;
          console.log(this.firstname); 
          this.lastname = res.lastname;
          console.log(this.lastname);         
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          //console.log(expirationDate);
          this.saveAuthData(token, expirationDate,this.firstname, this.lastname );
          this.router.navigate(['/dashboard'])
        }
      })
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    //console.log(authInformation, expiresIn);
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.firstname = authInformation.firstname;
      this.lastname = authInformation.lastname;
      this.setAuthTimer( expiresIn / 1000 );
      this.authStatusListener.next(true);
    }
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.firstname = null;
    this.lastname = null;
    this.fname = null;
    this.lname = null;
    this.loginName = null;
    this.name = null;
    this.projectid = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/home']);
  }

  private setAuthTimer(duration: number){
    //console.log("setting timer:" + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // to save data to local storage so that token should not expire when pages gets refresh
  private saveAuthData(token: string, expirationDate: Date, firstname: string, lastname: string){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('firstname', firstname);
    localStorage.setItem('lastname', lastname);
    console.log('firstname:'+firstname)
    console.log('lastname:'+lastname)
  }
  
  // clear the data after logout
  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    // localStorage.removeItem("lname");
    // localStorage.removeItem("fname");
    localStorage.removeItem("name");
    localStorage.removeItem("projectid");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    let firstname = localStorage.getItem("firstname");
    let lastname = localStorage.getItem("lastname");
    if(!token || !expirationDate){
      return;
    } return {
      token: token,
      expirationDate: new Date(expirationDate),
      firstname: firstname,
      lastname: lastname
    }
  }




}
