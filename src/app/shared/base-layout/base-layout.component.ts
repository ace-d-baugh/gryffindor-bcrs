/*
=====================================================
; File Name: base-layout.component.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/18/2023
; File Description: Base layout component
; Modifications: Chad ONeal
=====================================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';


// export class
@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class BaseLayoutComponent implements OnInit {
  sessionName: string;
  currentYear: number = new Date().getFullYear();
  role: any;
  reports: any;

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
      header: 'Log out confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cookieService.deleteAll()
        this.router.navigate(['/session/sign-in'])
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'Signout cancelled' });
            break
            case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'Signout out cancelled' });
            break
        }
      },
    });
  }
}
