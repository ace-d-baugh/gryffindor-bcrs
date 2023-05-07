/*
=====================================================
; File Name: home.component.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/18/2023
; File Description: Home component
; Modifications: Ace Baugh
=====================================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/shared/models/line-item.interface';
import { Product } from 'src/app/shared/models/product.interface';
import { Invoice } from 'src/app/shared/models/invoice';
import { Message } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceSummaryComponent } from 'src/app/shared/invoice-summary/invoice-summary.component';

// export component
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

// export class
export class HomeComponent implements OnInit {
  username: string;
  products: Product[];
  lineItems: LineItem[];
  invoice: Invoice;
  errorMessages: Message[];
  successMessages: Message[];

  // constructor
  constructor(
    private cookieService: CookieService,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private dialogRef: MatDialog
  ) {
    this.username = this.cookieService.get('sessionUser') ?? '';
    this.products = [];
    this.lineItems = [];
    this.invoice = {} as Invoice;
    this.errorMessages = [];
    this.successMessages = [];

    // get all products
    this.products = this.productService.getProducts();

    // create new invoice
    this.invoice = new Invoice(this.username);
  }

  ngOnInit(): void {}

  // generate invoice
  generateInvoice() {
    console.log('generateInvoice() this.invoice');
    console.log(this.invoice);

    console.log('generateInvoice() this.products');
    console.log(this.products);

    // clear line items
    for (let product of this.products) {
      if (product.checked) {
        this.lineItems.push(product);
      }
    }

    // if line items are greater than 0
    if (this.lineItems.length > 0) {
      this.invoice.setLineItems(this.lineItems);

      console.log('lineItems.length > 0; this.invoice');
      console.log(this.invoice);

      const dialogRef = this.dialogRef.open(InvoiceSummaryComponent, {
        data: {
          invoice: this.invoice,
        },
        disableClose: true,
        width: '800px',
      });

      // after dialog is closed
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'confirm') {
          this.invoiceService
            .createInvoice(this.username, this.invoice)
            .subscribe({
              next: (res) => {
                // Make this instead go to a Thank You page with an option to print the invoice
                console.log('Invoice Created');
                this.reloadProducts();
                this.clearLineItems();
                this.invoice.clear();
                this.successMessages = [
                  {
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Your order has been processed successfully.',
                  },
                ];
              },
              error: (e) => {
                console.log(e);
              },
            });
          // if result is cancel
        } else {
          console.log('Order Cancelled');
          this.reloadProducts();
          this.clearLineItems();
          this.invoice.clear();
        }
      });
      // if line items are less than 0
    } else {
      this.errorMessages = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Invoice Cancelled',
        },
      ];
    }
  }

  // reload products
  reloadProducts() {
    for (let product of this.products) {
      product.checked = false;
    }
  }

  // clear line items
  clearLineItems() {
    this.lineItems = [];
  }
}
