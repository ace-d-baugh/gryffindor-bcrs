/*
=====================================================
; File Name: user-details.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/22/2023
; File Description: user-details Component
; Modifications: John Vanhessche
=====================================================
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.interface';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User;
  userId: string;
  errorMessages: Message[];

  form: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required])],
    address: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.userId = this.route.snapshot.paramMap.get('userId') ?? '';
    this.user = {} as User;
    this.errorMessages = [];

    this.userService.findUserById(this.userId).subscribe({
      next: (res) => {
        this.user = res.data;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.form.controls['firstName'].setValue(this.user.firstName);
        this.form.controls['lastName'].setValue(this.user.lastName);
        this.form.controls['phoneNumber'].setValue(this.user.phoneNumber);
        this.form.controls['address'].setValue(this.user.address);
        this.form.controls['email'].setValue(this.user.email);

        console.log(this.user);
      },
    });
  }

  ngOnInit(): void {}

  saveUser(): void {
    const updatedUser = {
      username: this.user.username,
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      phoneNumber: this.form.controls['phoneNumber'].value,
      address: this.form.controls['address'].value,
      email: this.form.controls['email'].value,
    };

    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: (res) => {
        this.router.navigate(['main/users']);
      },
      error: (e) => {
        this.errorMessages = [
          { severity: 'error', summary: 'Error', detail: e.message },
        ];
        console.log(
          `Node.js server error; httpCode: ${e.httpCode}; message:${e.message}`
        );
        console.log(e);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/main/users/']);
  }
}
