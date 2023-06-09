/*
=====================================================
; File Name: security-question-details.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/08/2023
; File Description: security-question-details.component
; Modifications: John Vanhessche
=====================================================
*/

//import statements
import { Component, OnInit } from '@angular/core';
import { SecurityQuestion } from 'src/app/shared/models/security-question.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityQuestionService } from 'src/app/shared/services/security-question.service';
import { Message } from 'primeng/api';

//export class
@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css'],
})
export class SecurityQuestionDetailsComponent implements OnInit {
  question: SecurityQuestion;
  questionId: string;
  errorMessages: Message[];

  editForm: FormGroup = this.fb.group({
    text: [null, Validators.compose([Validators.required])],
  });

  //constructor
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private securityQuestionService: SecurityQuestionService
  ) {
    this.question = {} as SecurityQuestion;
    this.errorMessages = [];
    this.questionId = this.route.snapshot.paramMap.get('questionId') ?? '';

    //find security question by id
    this.securityQuestionService
      .findSecurityQuestionById(this.questionId)
      .subscribe({
        next: (res) => {
          this.question = res.data;
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          this.editForm.controls['text'].setValue(this.question.text);
        },
      });
  }

  ngOnInit(): void {}

  //save function
  save(): void {
    const updatedSecurityQuestion: SecurityQuestion = {
      text: this.editForm.controls['text'].value,
    };

    this.securityQuestionService
      .updateSecurityQuestion(this.questionId, updatedSecurityQuestion)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/main/security-question-list']);
        },
        error: (e) => {
          this.errorMessages = [
            { severity: 'error', summary: 'Error', detail: e.message },
          ];
          console.log(
            'Error occurred while saving teh updated security question.'
          );
        },
      });
  }

  //cancel function
  cancel(): void {
    this.router.navigate(['/main/security-question-list']);
  }
}
