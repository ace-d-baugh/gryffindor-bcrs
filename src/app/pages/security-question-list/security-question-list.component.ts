/*
=====================================================
; File Name: security-question-list.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/22/2023
; File Description: security-question-list.component
; Modifications: John Vanhessche
=====================================================
*/

import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css']
})
export class SecurityQuestionListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
