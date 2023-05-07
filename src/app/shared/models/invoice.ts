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

// Import statements
import { LineItem } from './line-item.interface';

// Export class
export class Invoice {
  private username: string;
  private lineItems: LineItem[];
  private orderDate: string;
  private LABOR_RATE: number = 50.0;

  partsAmount: number;
  laborHours: number;

  // Constructor
  constructor(username?: string, partsAmount?: number, laborHours?: number) {
    this.username = username || '';
    this.partsAmount = partsAmount || 0;
    this.laborHours = laborHours || 0;
    this.lineItems = [];
    this.orderDate = new Date().toLocaleDateString('en-US');
  }

  // Getters and Setters

  // get username
  getUsername(): string {
    return this.username;
  }

  // set line items
  setLineItems(lineItems: LineItem[]): void {
    this.lineItems = lineItems;
  }

  // get line items
  getLineItems(): LineItem[] {
    return this.lineItems;
  }

  // get line item total
  getLineItemTotal(): number {
    let total: number = 0;

    // loop over line items and add the price to the total
    this.lineItems.forEach((item) => {
      total += item.price;
    });

    // return the total
    return total;
  }

  // get labor amount
  getLaborAmount(): number {
    return Number(this.laborHours) * Number(this.LABOR_RATE);
  }

  // get order date
  getOrderDate(): string {
    return this.orderDate;
  }

  // get total
  getTotal(): number {
    return (
      Number(this.partsAmount) +
      Number(this.getLaborAmount()) +
      Number(this.getLineItemTotal())
    );
  }

  // clears the invoice
  clear() {
    this.lineItems = [];
    this.partsAmount = 0;
    this.laborHours = 0;
  }
}
