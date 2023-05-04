/*
============================================
; Title: user-create.component.css for BCRS
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 03/25/2023
; Description: user-create.component.css for BCRS
===========================================
*/

//import statements
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { Message } from 'primeng/api';
import { User } from '../../shared/models/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//component
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})

//export class
export class UserCreateComponent implements OnInit {
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
  });

  // variables
  user: User;
  userId: string;
  errorMessages: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.user = {} as User;
    this.userId = '';
  }

  ngOnInit(): void {}

  //create user function
  createUser(): void {
    const newUser: User = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      phoneNumber: this.form.controls['phoneNumber'].value,
      address: this.form.controls['address'].value,
      email: this.form.controls['email'].value,
    };

    this.userService.createUser(newUser).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/main/users']);
      },
      error: (err) => {
        this.errorMessages = [
          { severity: 'error', summary: 'Error', detail: err.message },
        ];
        console.log(
          'Node.js server error; httpCode:${err.httpCode};message:${err.message}'
        );
        console.log(err);
      },
    });
  }

  //cancel function
  cancel(): void {
    this.router.navigate(['/main/users']);
  }
}
