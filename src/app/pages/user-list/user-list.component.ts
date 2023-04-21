/*
=====================================================
; File Name: user-list.component.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/20/2023
; File Description: user-list.component
; Modifications: John Vanhessche
=====================================================
*/

import { Component, OnInit } from '@angular/core';
import { User } from "../../shared/models/user.interface";
import { UserService } from "../../shared/services/user.service";
import { ConfirmationService, ConfirmEventType } from "primeng/api";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
