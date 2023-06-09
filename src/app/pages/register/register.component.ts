/*
============================================
; Title: register.component.ts
; Author: Professor Krasso
; Modified by: Ace Baugh
; Date: 05/08/2023
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
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

const fadeAnimation = trigger('fade', [
  state('void', style({ opacity: 0 })),
  state('*', style({ opacity: 1 })),
  transition('void => *, * => void', [animate('1s ease-in-out')]),
]);

//component
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fadeAnimation],
})

//export class
export class RegisterComponent implements OnInit {
  //variables
  securityQuestions: SecurityQuestion[];
  user: User;
  errorMessages: Message[] = [];
  selectedSecurityQuestions: SelectedSecurityQuestion[];
  questionList1: SecurityQuestion[];
  questionList2: SecurityQuestion[];
  questionList3: SecurityQuestion[];

  //form group
  form: FormGroup = this.fb.group({
    username: [null, Validators.compose([Validators.required])],
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[A-Z])[A-Za-z\\d]{8,}$'
        ),
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
    this.questionList1 = [];
    this.questionList2 = [];
    this.questionList3 = [];

    this.securityQuestionService.findAllSecurityQuestions().subscribe({
      next: (res) => {
        this.securityQuestions = res.data;
        this.questionList1 = this.securityQuestions;
        this.questionList2 = this.securityQuestions;
        this.questionList3 = this.securityQuestions;
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

    this.sessionService.register(this.user).subscribe({
      next: (res) => {
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

  // update security question options
  updateSecurityQuestionOptions(): void {
    // If Question 1 is changed
    if (this.form.value.securityQuestion1) {
      // If Questions 2 & 3 have not been selected yet
      if (
        this.form.value.securityQuestion2 === null &&
        this.form.value.securityQuestion3 === null
      ) {
        // Question 2 list is equal to security questions minus what was selected from Question 1
        this.questionList2 = this.securityQuestions.filter(
          (question) => question.text !== this.form.value.securityQuestion1
        );
        // Question 3 List is unchanged
      }
      // If question 3 has not been selected yet but 1 & 2 have
      if (this.form.value.securityQuestion3 === null) {
        this.questionList3 = this.securityQuestions.filter(
          (question) =>
            question.text !== this.form.value.securityQuestion1 &&
            question.text !== this.form.value.securityQuestion2
        );
      }
      // If answers have been chosen
      this.questionList2 = this.securityQuestions.filter(
        (question) =>
          question.text !== this.form.value.securityQuestion1 &&
          question.text !== this.form.value.securityQuestion3
      );
      this.questionList3 = this.securityQuestions.filter(
        (question) =>
          question.text !== this.form.value.securityQuestion1 &&
          question.text !== this.form.value.securityQuestion2
      );
    }

    // If Question 2 is changed
    if (this.form.value.securityQuestion2) {
      // If question 3 has not been selected yet but 1 & 2 have
      if (this.form.value.securityQuestion3 === null) {
        this.questionList3 = this.securityQuestions.filter(
          (question) =>
            question.text !== this.form.value.securityQuestion1 &&
            question.text !== this.form.value.securityQuestion2
        );
      }
      // If answers have been chosen
      this.questionList1 = this.securityQuestions.filter(
        (question) =>
          question.text !== this.form.value.securityQuestion2 &&
          question.text !== this.form.value.securityQuestion3
      );
      this.questionList3 = this.securityQuestions.filter(
        (question) =>
          question.text !== this.form.value.securityQuestion1 &&
          question.text !== this.form.value.securityQuestion2
      );
    }

    // If Question 3 is changed
    if (this.form.value.securityQuestion3) {
      // If answers have been chosen
      this.questionList1 = this.securityQuestions.filter(
        (question) =>
          question.text !== this.form.value.securityQuestion2 &&
          question.text !== this.form.value.securityQuestion3
      );
      this.questionList2 = this.securityQuestions.filter(
        (question) =>
          question.text !== this.form.value.securityQuestion1 &&
          question.text !== this.form.value.securityQuestion3
      );
    }
  }

  resetSecurityQuestions(): void {
    this.questionList1 = this.securityQuestions;
    this.questionList2 = this.securityQuestions;
    this.questionList3 = this.securityQuestions;
  }
}
