/*
=====================================================
; File Name: print-layout.component.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/06/2023
; File Description: print-layout
; Modifications: John Vanhessche
=====================================================
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css']
})
export class PrintLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cancel() 
  {
    //cancel takes the user back to the invoice-summary.
    this.router.navigate(['/main//shared/invoice-summary'])
  }


}
