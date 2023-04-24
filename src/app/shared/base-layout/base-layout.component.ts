/*
=====================================================
; File Name: base-layout.component.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/18/2023
; File Description: Base layout component
; Modifications: Ace Baugh
=====================================================
*/

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,}
from 'primeng/api';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class BaseLayoutComponent implements OnInit {
  sessionName: string;
  hideHeaderFooter: boolean = false;
  currentYear: number = new Date().getFullYear();
  role: string | undefined;


  //  constructor
  constructor(private cookieService: CookieService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.sessionName = this.cookieService.get('session_name')
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideHeaderFooter = event.url === '/session/sign-in';
        this.role = this.cookieService.get('admin'); // Replace 'user_role' with the actual cookie key for the user role
      }
    });
  }

  ngOnInit(): void {}

  // signout function
  signout() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to proceed?',
      header: 'Sign out confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cookieService.deleteAll()
        this.router.navigate(['/session/sign-in'])
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'Sign out cancelled' });
            break
            case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'Sign out cancelled' });
            break
        }
      }
    })
  }
}
