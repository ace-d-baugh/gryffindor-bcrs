/*
=====================================================
; File Name: invoice.service.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/04/2023
; File Description: The invoice service
; Modifications: Ace Baugh
=====================================================
*/

// Import statements
import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Injectable
@Injectable({
  providedIn: 'root'
})

// Export class
export class InvoiceService {

  // Constructor
  constructor(private http: HttpClient) { }

  // Create invoice
  createInvoice(username: string, invoice: Invoice): Observable<any> {
    return this.http.post(`/api/invoices/${username}`, {
      username: username,
      lineItems: invoice.getLineItems(),
      partsAmount: invoice.partsAmount,
      laborAmount: invoice.getLaborAmount(),
      lineItemTotal: invoice.getLineItemTotal(),
      total: invoice.getTotal(),
    })
  }

  // Find purchase by service for the graph
  findPurchasesByServiceGraph(): Observable<any> {
    return this.http.get('/api/invoices/purchases-graph');
  }
}
