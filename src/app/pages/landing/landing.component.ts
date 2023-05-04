/*
=====================================================
; File Name: landing.component.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/18/2023
; File Description: Landing Page component
; Modifications: Ace Baugh
=====================================================
*/

//import statements
// import statements
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';

//component
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [MessageService, ConfirmationService],
})

//export class
export class LandingComponent implements OnInit {
  sessionName: string;
  currentYear: number = new Date().getFullYear();
  role: any;

  //  constructor
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.sessionName = this.cookieService.get('sessionUser');
  }

  ngOnInit(): void {}

  // signout function
  signout() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to proceed?',
      header: 'Sign out confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cookieService.deleteAll();
        this.router.navigate(['/session/sign-in']);
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'info',
              summary: 'Cancelled',
              detail: 'Sign out cancelled',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'info',
              summary: 'Cancelled',
              detail: 'Sign out cancelled',
            });
            break;
        }
      },
    });
  }
}
