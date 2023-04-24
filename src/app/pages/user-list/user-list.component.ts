/*
=====================================================
; File Name: user-list.component.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/20/2023
; File Description: user-list.component
; Modifications: Chad ONeal
=====================================================
*/

//import statements
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.interface';
import { UserService } from '../../shared/services/user.service';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';

//export class
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})

//export class
export class UserListComponent implements OnInit {
  users: User[] = [];

  //  constructor
  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService
  ) {
    this.userService.findAllUsers().subscribe({
      next: (res) => {
        this.users = res.data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  //ngOnInit
  ngOnInit(): void {}

  //delete
  delete(userId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(userId).subscribe({
          next: (res) => {
            console.log('User deleted successfully');
            this.users = this.users.filter((user) => user._id !== userId);
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
            console.log('User cancelled this operation');
            break;
        }
      },
    });
  }
}
