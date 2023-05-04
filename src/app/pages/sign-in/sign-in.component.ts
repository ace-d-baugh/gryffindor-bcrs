/*
============================================
; Title: sign-in.component.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 04/23/2023
; Description: sign-in component
============================================
*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from 'src/app/shared/services/session.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  // create a property that contains a form group
  signinForm: FormGroup = this.fb.group({
    username: [null, Validators.compose([Validators.required])],
    //pattern for password: at least 8 characters, at least one letter, at least one number
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[A-Z])[A-Za-z\\d]{8,}$'
        ),
      ]),
    ],
  });

  // create a property that contains an array of messages
  errorMessages: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {}

  /**
   * Description: signin function
   * username: comes from the form input
   * password: comes from the form input
   * details: calls the session service to signin
   */
  signin() {
    alert;
    const username = this.signinForm.controls['username'].value;
    const password = this.signinForm.controls['password'].value;

    this.sessionService.signin(username, password).subscribe({
      next: (res) => {
        console.log(res);
        this.cookieService.set('sessionUser', res.data.username, 1);
        this.router.navigate(['main/']);
      },
      error: (e) => {
        this.errorMessages = [
          { severity: 'error', summary: 'Error', detail: e.message },
        ];
        console.log(e);
      },
    });
  }
}
