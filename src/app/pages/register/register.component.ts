/*
============================================
; Title: register.component.ts
; Author: Professor Krasso
; Modified by: Ace Baugh
; Date: 04/30/2023
; Description: This is the register component ts file
===========================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { User } from '../../shared/models/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityQuestion } from 'src/app/shared/models/security-question.interface';
import { CookieService } from 'ngx-cookie-service';
import { SecurityQuestionService } from 'src/app/shared/services/security-question.service';
import { SelectedSecurityQuestion } from 'src/app/shared/models/selected-security-question.interface';
import { SessionService } from 'src/app/shared/session.service';

//component
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

//export class
export class RegisterComponent implements OnInit {
  //variables
  securityQuestions: SecurityQuestion[];
  user: User;
  errorMessages: Message[] = [];
  selectedSecurityQuestions: SelectedSecurityQuestion[];

  //form group
  form: FormGroup = this.fb.group({
    username: [null, Validators.compose([Validators.required])],
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
      ]),
    ],
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required])],
    address: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    securityQuestion1: [null, Validators.compose([Validators.required])],
    answerToSecurityQuestion1: [
      null,
      Validators.compose([Validators.required]),
    ],
    securityQuestion2: [null, Validators.compose([Validators.required])],
    answerToSecurityQuestion2: [
      null,
      Validators.compose([Validators.required]),
    ],
    securityQuestion3: [null, Validators.compose([Validators.required])],
    answerToSecurityQuestion3: [
      null,
      Validators.compose([Validators.required]),
    ],
  });

  // constructor

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private securityQuestionService: SecurityQuestionService,
    private sessionService: SessionService
  ) {
    this.securityQuestions = [];
    this.selectedSecurityQuestions = [];
    this.errorMessages = [];
    this.user = {} as User;

    this.securityQuestionService.findAllSecurityQuestions().subscribe({
      next: (res) => {
        this.securityQuestions = res.data;
        console.log(this.securityQuestions);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {}

  //Register user function
  register(): void {
    const form = this.form.value;

    this.selectedSecurityQuestions = [
      {
        questionText: form.securityQuestion1,
        answerText: form.answerToSecurityQuestion1,
      },
      {
        questionText: form.securityQuestion2,
        answerText: form.answerToSecurityQuestion2,
      },
      {
        questionText: form.securityQuestion3,
        answerText: form.answerToSecurityQuestion3,
      },
    ];
    console.log(this.selectedSecurityQuestions);

    this.user = {
      username: form.username,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNumber: form.phoneNumber,
      address: form.address,
      email: form.email,
      selectedSecurityQuestions: this.selectedSecurityQuestions,
    };
    console.log(this.user);

    this.sessionService.register(this.user).subscribe({
      next: (res) => {
        console.log(res);
        this.cookieService.set('sessionUser', this.user.username, 1);
        this.router.navigate(['main/']);
      },
      error: (err) => {
        this.errorMessages = [
          { severity: 'error', summary: 'Error', detail: err.message },
        ];
        console.log(`Node.js server error: ${err.message}`);
        console.log(err);
      },
    });
  }

  //cancel function
  cancel(): void {
    this.router.navigate(['/session/sign-in']);
  }
}
