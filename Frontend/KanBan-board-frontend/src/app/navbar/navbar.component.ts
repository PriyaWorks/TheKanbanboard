import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef; 

  userIsAuthenticated: boolean = false;
  private authListenerSubs: Subscription;
  linkDisable = true;
  constructor(private authService: AuthService, public mdbModalService: BsModalService
              ) { }

  openModal(loginTemplate: TemplateRef<any>){
    this.modalRef = this.mdbModalService.show(loginTemplate);
  }

  openRegisterModal(registerTemplate){
    this.modalRef = this.mdbModalService.show(registerTemplate);
  }
  
  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    //   $(document).ready(function(){
    //     $("li").click(function(){
    //         var a = $("a");
    //     });
    // });
  }
  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
  
}
