/*
=====================================================
; File Name: not-found.component.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/18/2023
; File Description: 404 page
; Modifications: Ace Baugh
=====================================================
*/

import { Component } from '@angular/core';

// NotFound component
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {

  constructor() {}

  goBack() {
    window.history.back();
  }
}
