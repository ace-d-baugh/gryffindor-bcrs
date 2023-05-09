/*
=====================================================
; File Name: role-list.component.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/08/2023
; File Description: role-list.component
; Modifications: John Vanhessche
=====================================================
*/

//import required components.
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/shared/models/role.interface';
import { RoleService } from 'src/app/shared/services/role.service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class RoleListComponent implements OnInit {
  //declaring data types
  roles: Role[];
  errorMessages: Message[];

  roleForm: FormGroup = this.fb.group({
    text: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private roleService: RoleService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.roles = [];
    this.errorMessages = [];

    //calls api for finding all roles.
    this.roleService.findAllRoles().subscribe({
      next: (res) => {
        this.roles = res.data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {}

  //Client side method for creating a new role
  create() {
    const newRole: Role = {
      //sets newRole to the data the user enters into the form
      text: this.roleForm.controls['text'].value,
    };

    //calls the createRole from the routes/role-api.  This checks to see if the role entered exists, if so
    //it returns an error, if not, it accepts the role entered.
    this.roleService.createRole(newRole).subscribe({
      next: (res) => {
        if (res.data) {
          //if res.data is good (200), adds to the role array
          this.roles.push(res.data);
        } else {
          //if res data is not good, returns error back to the user
          this.errorMessages = [
            { severity: 'error', summary: 'Error', detail: res.message },
          ];
        }
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.roleForm.controls['text'].setErrors({ Incorrect: false });
      },
    });
  }

  //method for deleting role by id.
  delete(roleId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.roleService.deleteRole(roleId).subscribe({
          next: (res) => {
            // If res contains a 400 error, it will return the error message to the user
            if (JSON.stringify(res).includes('400')) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Role is in use and cannot be deleted',
              });
              return;
            } else {
              this.roles = this.roles.filter((role) => role._id != roleId);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Role deleted successfully',
              });
            }
          },
        });
      },
      reject: (type: any) => {
        switch (type) {
          //if user does something other than confirm delete.
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
