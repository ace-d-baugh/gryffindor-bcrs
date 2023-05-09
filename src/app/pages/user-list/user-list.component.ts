/*
=====================================================
; File Name: user-list.component.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/08/2023
; File Description: user-list.component
; Modifications: Chad ONeal
=====================================================
*/

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class UserListComponent implements OnInit {
  users: User[];
  errorMessages: Message[];

  userForm: FormGroup = this.fb.group({
    username: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.users = [];
    this.errorMessages = [];

    this.userService.findAllUsers().subscribe({
      next: (res) => {
        this.users = res.data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {}

  delete(userId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(userId).subscribe({
          next: (res) => {
            console.log('User deleted successfully');
            this.users = this.users.filter((user) => user._id != userId);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User deleted successfully',
            });
          },
          error: (e) => {
            console.log(e);
          },
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            console.log('User rejected this operation');
            break;
          case ConfirmEventType.CANCEL:
            console.log('User canceled this operation');
            break;
        }
      },
    });
  }
}
