/*
=====================================================
; File Name: role-details.component.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/08/2023
; File Description: role-details.component
; Modifications: John Vanhessche
=====================================================
*/

//import components
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/shared/models/role.interface';
import { Message } from 'primeng/api';
import { RoleService } from 'src/app/shared/services/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css'],
})
export class RoleDetailsComponent implements OnInit {
  //define data types
  role: Role;
  roleId: string;
  errorMessages: Message[];

  roleForm: FormGroup = this.fb.group({
    text: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService
  ) {
    this.roleId = this.route.snapshot.paramMap.get('roleId') ?? '';
    this.role = {} as Role;
    this.errorMessages = [];

    //api call to find role by Id.
    this.roleService.findRoleById(this.roleId).subscribe({
      next: (res) => {
        this.role = res.data;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.roleForm.controls['text'].setValue(this.role.text);
      },
    });
  }

  ngOnInit(): void {}

  cancel() {
    //cancel takes the user back to the role-list page.
    this.router.navigate(['/main/role-list']);
  }

  //saves new role based on user text.
  save() {
    const updatedRole: Role = {
      text: this.roleForm.controls['text'].value,
    };

    this.roleService.updateRole(this.roleId, updatedRole).subscribe({
      next: (res) => {
        //Once role is updated, returns to the role-list page
        this.router.navigate(['/main/role-list']);
      },
      error: (e) => {
        this.errorMessages = [
          { severity: 'error', summary: 'Error', detail: e.message },
        ];
        console.log('Error occurred while saving the updated role');
      },
    });
  }
}
