/*
============================================
; Title: verify-username-form.component
; Author: Professor Krasso
; Modified by: John Vanhessche
; Date: 04/27/2023
; Description: verify-username-form
===========================================
*/

//imoport statements
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

//export component
@Component({
  selector: 'app-verify-username-form',
  templateUrl: './verify-username-form.component.html',
  styleUrls: ['./verify-username-form.component.css'],
})
export class VerifyUsernameFormComponent implements OnInit {
  errorMessages: Message[];

  form: FormGroup = this.fb.group({
    username: [null, Validators.compose([Validators.required])],
  });

  //  constructor
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.errorMessages = [];
  }

  ngOnInit(): void {}

  //takes entered user name, calls verifyUsername api.  If user found, navigates to the /session/verify-security-questions form.
  verifyUser() {
    const username = this.form.controls['username'].value;

    this.sessionService.verifyUsername(username).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/session/verify-security-questions'], {
          queryParams: { username: username },
          skipLocationChange: true,
        });
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
