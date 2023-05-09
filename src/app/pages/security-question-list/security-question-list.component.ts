/*
=====================================================
; File Name: security-question-list.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/08/2023
; File Description: security-question-list.component
; Modifications: John Vanhessche
=====================================================
*/

//import statements
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { SecurityQuestionService } from 'src/app/shared/services/security-question.service';
import { SecurityQuestion } from 'src/app/shared/models/security-question.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';

//export class
@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css'],
  providers: [ConfirmationService],
})

//export class
export class SecurityQuestionListComponent implements OnInit {
  securityQuestions: SecurityQuestion[];
  errorMessages: Message[];

  sqForm: FormGroup = this.fb.group({
    text: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private securityQuestionService: SecurityQuestionService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.securityQuestions = [];
    this.errorMessages = [];

    this.securityQuestionService.findAllSecurityQuestions().subscribe({
      next: (res) => {
        this.securityQuestions = res.data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  //ngOnInit
  ngOnInit(): void {}

  create(): void {
    const sqText = this.sqForm.controls['text'].value;

    const newSq = {
      text: sqText,
    };

    this.securityQuestionService.createSecurityQuestion(newSq).subscribe({
      next: (res) => {
        this.securityQuestions.push(res.data);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.sqForm.controls['text'].setErrors({ incorrect: false });
      },
    });
  }

  //delete function
  delete(sqId: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.securityQuestionService.deleteSecurityQuestion(sqId).subscribe({
          next: (res) => {
            console.log('Security question deleted successfully');
            this.securityQuestions = this.securityQuestions.filter(
              (sq) => sq._id !== sqId
            );
            this.errorMessages = [
              {
                severity: 'success',
                summary: 'Success',
                detail: 'Security question deleted successfully',
              },
            ];
          },
          error: (e) => {
            console.log(e);
          },
        });
      },
      reject: (type: any) => {
        switch (type) {
          //if user does anything other than confirm delete.
          case ConfirmEventType.REJECT:
            console.log('User rejected this operation');
            break;
          case ConfirmEventType.CANCEL:
            console.log('user cancelled this operation');
            break;
        }
      },
    });
  }
}
