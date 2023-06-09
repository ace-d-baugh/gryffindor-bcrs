/*
============================================
; Title: verify-security-questions-form.component.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 05/08/2023
; Description: verify-security-questions-form.component.ts
===========================================
*/

//import statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { SelectedSecurityQuestion } from '../../models/selected-security-question.interface';
import { VerifySecurityQuestionModel } from '../../models/verify-security-question.interface';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-verify-security-questions-form',
  templateUrl: './verify-security-questions-form.component.html',
  styleUrls: ['./verify-security-questions-form.component.css'],
})

//export class VerifySecurityQuestionsFormComponent
export class VerifySecurityQuestionsFormComponent implements OnInit {
  selectedSecurityQuestions: SelectedSecurityQuestion[];
  verifySecurityQuestionsModel: VerifySecurityQuestionModel;
  username: string;
  errorMessages: Message[];

  form: FormGroup = this.fb.group({
    answerToSecurityQuestion1: [
      null,
      Validators.compose([Validators.required]),
    ],
    answerToSecurityQuestion2: [
      null,
      Validators.compose([Validators.required]),
    ],
    answerToSecurityQuestion3: [
      null,
      Validators.compose([Validators.required]),
    ],
  });
  //verifySecurityQuestionModel: any;

  //constructor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private sessionService: SessionService
  ) {
    this.username = this.route.snapshot.queryParamMap.get('username') ?? '';
    this.errorMessages = [];
    this.verifySecurityQuestionsModel = {} as VerifySecurityQuestionModel;
    this.selectedSecurityQuestions = [];
    // findSelectedSecurityQuestions from userService
    this.userService.findSelectedSecurityQuestions(this.username).subscribe({
      next: (res) => {
        this.selectedSecurityQuestions = res.data;
      },
      error: (e) => {
        console.log(e);
      },
      // complete
      complete: () => {
        this.verifySecurityQuestionsModel.question1 =
          this.selectedSecurityQuestions[0].questionText;
        this.verifySecurityQuestionsModel.question2 =
          this.selectedSecurityQuestions[1].questionText;
        this.verifySecurityQuestionsModel.question3 =
          this.selectedSecurityQuestions[2].questionText;
      },
    });
  }

  ngOnInit(): void {}

  // function verifySecurityQuestions for
  verifySecurityQuestions() {
    this.verifySecurityQuestionsModel.answerToQuestion1 =
      this.form.controls['answerToSecurityQuestion1'].value;
    this.verifySecurityQuestionsModel.answerToQuestion2 =
      this.form.controls['answerToSecurityQuestion2'].value;
    this.verifySecurityQuestionsModel.answerToQuestion3 =
      this.form.controls['answerToSecurityQuestion3'].value;

    // verifySecurityQuestions from sessionService
    this.sessionService
      .verifySecurityQuestions(this.verifySecurityQuestionsModel, this.username)
      .subscribe({
        next: (res) => {
          if (res.message === 'Success') {
            this.router.navigate(['/session/reset-password'], {
              queryParams: { isAuthenticated: 'true', username: this.username },
              skipLocationChange: true,
            });
          } else {
            this.errorMessages = [
              {
                severity: 'error',
                summary: 'Error',
                detail: 'Unable to verify security question answers',
              },
            ];
          }
        },
        // error
        error: (e) => {
          console.log(e);
        },
      });
  }
}
