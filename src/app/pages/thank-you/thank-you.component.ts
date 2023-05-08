/*
=====================================================
; File Name: thank-you.component.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/08/2023
; File Description: The Thank you for your purchase component
; Modifications: Ace Baugh
=====================================================
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
})
export class ThankYouComponent implements OnInit {
  invoice: any;
  username: string;
  orderDate: string;
  total: number;
  labor: number;
  parts: number;
  lineItems: Array<any>;

  constructor(private route: ActivatedRoute, private router: Router) {
    // Variables
    this.username = '';
    this.orderDate = '';
    this.total = 0;
    this.labor = 0;
    this.parts = 0;
    this.lineItems = [];

    this.invoice = history.state.invoice;
    // If invoice is null, redirect to home page
    if (this.invoice) {
      console.log(JSON.stringify(this.invoice));
      console.log(this.invoice.username);
      this.username = this.invoice.username;
      this.orderDate = this.invoice.orderDate;
      this.parts = this.invoice.partsAmount;
      this.labor = this.invoice.laborHours;
      this.total = history.state.total;
      this.lineItems = this.invoice.lineItems;
    } else {
      this.router.navigate(['/main/']);
    }
  }

  printPage() {
    window.print();
  }

  ngOnInit(): void {}
}
