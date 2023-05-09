/*
=====================================================
; File Name: server-error.component.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/08/2023
; File Description: 500 page
; Modifications: Ace Baugh
=====================================================
*/

import { Component } from '@angular/core';

// ServerError component
@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css'],
})
export class ServerErrorComponent {
  constructor() {}

  goBack() {
    window.history.back();
  }
}
