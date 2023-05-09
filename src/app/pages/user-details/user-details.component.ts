/*
=====================================================
; File Name: user-details.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/08/2023
; File Description: user-details Component
; Modifications: John Vanhessche
=====================================================
*/

// imports from angular core
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.interface';
import { Message } from 'primeng/api';
import { Role } from 'src/app/shared/models/role.interface';
import { RoleService } from 'src/app/shared/services/role.service';

//  declare component
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})

// export component
export class UserDetailsComponent implements OnInit {
  user: User;
  userId: string;
  roles: Role[];
  errorMessages: Message[];

  //  declare form
  form: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    role: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required])],
    address: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
  });

  //  declare constructor
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.userId = this.route.snapshot.paramMap.get('userId') ?? '';
    this.user = {} as User;
    this.errorMessages = [];
    this.roles = [];

    //  find user by id
    this.userService.findUserById(this.userId).subscribe({
      next: (res) => {
        this.user = res.data;
      },
      error: (e) => {
        console.log(e);
      },
      //  set form values
      complete: () => {
        this.form.controls['firstName'].setValue(this.user.firstName);
        this.form.controls['lastName'].setValue(this.user.lastName);
        this.form.controls['role'].setValue(this.user.role?.text);
        this.form.controls['phoneNumber'].setValue(this.user.phoneNumber);
        this.form.controls['address'].setValue(this.user.address);
        this.form.controls['email'].setValue(this.user.email);

        //  find all roles
        this.roleService.findAllRoles().subscribe({
          next: (res) => {
            this.roles = res.data;
          },
          error: (e) => {
            console.log(e);
          },
        });
      },
    });
  }

  ngOnInit(): void {}

  saveUser(): void {
    const updatedUser = {
      username: this.user.username,
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      role: { text: this.form.controls['role'].value },
      phoneNumber: this.form.controls['phoneNumber'].value,
      address: this.form.controls['address'].value,
      email: this.form.controls['email'].value,
    };

    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: (res) => {
        this.router.navigate(['/main/users']);
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
    this.router.navigate(['/main/users']);
  }
}
