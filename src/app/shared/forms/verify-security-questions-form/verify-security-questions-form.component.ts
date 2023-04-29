/*
============================================
; Title: verify-security-questions-form.component
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 04/29/2023
; Description: verify-security-questions-form
===========================================
*/

import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-verify-security-questions-form',
  templateUrl: './verify-security-questions-form.component.html',
  styleUrls: ['./verify-security-questions-form.component.css']
})
export class VerifySecurityQuestionsFormComponent implements OnInit {

  errorMessages: Message[];

  form: FormGroup = this.fb.group({
    securityquestions: [null, Validators.compose([Validators.required])]
  });

  constructor(private fb: FormBuilder, private router: Router, private sessionService: SessionService) {
    this.errorMessages = [];
   }

  ngOnInit(): void {
  }

  //takes entered security questions, calls verify-security-questions api.  If questions are found, navigates to the /session/.
  verifySecurityQuestions() {
    const securityquestions = this.form.controls['securityquestions'].value;

    this.sessionService.securityquestions(securityquestions).subscribe({
      next: (res: any) => {
        console.log(res);
        this.router.navigate(['/session/'], {queryParams: {securityquestions: securityquestions}, skipLocationChange: true});
      },
      error: (e: { message: any; }) => {
        this.errorMessages = [ {severity: 'error', summary: 'Error', detail: e.message }]
        console.log(e)
      }
    })
  }
}
