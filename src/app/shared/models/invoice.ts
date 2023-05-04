/*
=====================================================
; File Name: invoice.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/04/2023
; File Description: The invoice class
; Modifications: Ace Baugh
=====================================================
*/

import { LineItem } from './line-item.interface';

export class Invoice {
  private username: string;
  private lineItems: LineItem[];
  private orderDate: string;
  private LABOR_RATE: number = 50.00;

  partsAmount: number;
  laborHours: number;

  constructor(username?: string, partsAmount?: number, laborHours?: number) {
    this.username = username || '';
    this.partsAmount = partsAmount || 0;
    this.laborHours = laborHours || 0;
    this.lineItems = [];
    this.orderDate = new Date().toLocaleDateString('en-US');
  }

  // Getters and Setters
  getUsername(): string {
    return this.username;
  }

  setLineItems(lineItems: LineItem[]): void {
    this.lineItems = lineItems;
  }

  getLineItems(): LineItem[] {
    return this.lineItems;
  }

  getLineItemTotal(): number {
    let total: number = 0;

    this.lineItems.forEach((item) => {
      total += item.price;
    });

    return total;
  }

  getLaborAmount(): number {
    return Number(this.laborHours) * Number(this.LABOR_RATE);
  }

  getOrderDate(): string {
    return this.orderDate;
  }

  getTotal(): number {
    return Number(this.partsAmount) + Number(this.getLaborAmount()) + Number(this.getLineItemTotal());
  }

  // clears the invoice
  clear() {
    this.lineItems = [];
    this.partsAmount = 0;
    this.laborHours = 0;
  }
}
