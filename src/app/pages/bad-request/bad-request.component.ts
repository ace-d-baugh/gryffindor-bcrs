/*
=====================================================
; File Name: bad-request.component.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/08/2023
; File Description: 400 Bad Request page
; Modifications: Ace Baugh
=====================================================
*/

import { Component } from '@angular/core';

// BadRequest component
@Component({
  selector: 'app-bad-request',
  templateUrl: './bad-request.component.html',
  styleUrls: ['./bad-request.component.css'],
})
export class BadRequestComponent {
  constructor() {}

  goBack() {
    window.history.back();
  }
}
