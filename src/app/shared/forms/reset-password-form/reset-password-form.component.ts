/*
============================================
; Title: reset-password-form.component
; Author: Professor Krasso
; Modified by: John Vanhessche
; Date: 05/08/2023
; Description: reset-password-form
===========================================
*/

//import components
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css'],
})
export class ResetPasswordFormComponent implements OnInit {
  isAuthenticated: string;
  username: string;

  form: FormGroup = this.fb.group({
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private sessionService: SessionService
  ) {
    this.isAuthenticated =
      this.route.snapshot.queryParamMap.get('isAuthenticated') ?? '';
    this.username = this.route.snapshot.queryParamMap.get('username') ?? '';
  }

  ngOnInit(): void {}

  //method for updating password.
  updatePassword() {
    const password = this.form.controls['password'].value;

    this.sessionService.updatePassword(password, this.username).subscribe({
      next: (res) => {
        this.cookieService.set('sessionUser', this.username, 1);
        this.router.navigate(['/main/']);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
