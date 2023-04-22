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

import { Component, OnInit, } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';


@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
  providers: [MessageService, ConfirmationService]
})

export class BaseLayoutComponent implements OnInit {
  sessionName: string
  year: number = Date.now();
  hideHeaderFooter: boolean = false;

  //  constructor
  constructor(private cookieService: CookieService, public router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.sessionName = this.cookieService.get('session_name')
    this.year = Date.now()
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideHeaderFooter = event.url === '/session/sign-in';
      }
     });
   }

  ngOnInit(): void {
  }

  // logout function
  signout() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to proceed?',
      header: 'Log out confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cookieService.deleteAll()
        this.router.navigate(['/session/login'])
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'Log out cancelled' });
            break
            case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'Log out cancelled' });
            break
        }
      }
    })
  }
}
