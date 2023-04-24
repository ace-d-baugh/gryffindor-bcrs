/*
=====================================================
; File Name: landing.component.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/18/2023
; File Description: Landing Page component
; Modifications: Ace Baugh
=====================================================
*/

//import statements
import { Component, OnInit } from '@angular/core';

//component
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})

//export class
export class LandingComponent implements OnInit {

  //currentYear variable
  currentYear: number = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {}
}
