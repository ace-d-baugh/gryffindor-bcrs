/*
============================================
; Title: purchases-by-service-graph.component.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 05/06/2023
; Description: purchases-by-service-graph.component.ts
===========================================
*/

//import statements
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';


//component that pulls invoice info into graph
@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html',
  styleUrls: ['./purchases-by-service-graph.component.css']
})
export class PurchasesByServiceGraphComponent implements OnInit {

  //define controls
  purchases: any;
  data: any;
  itemCount: string[];
  labels: string [];

  constructor(private invoiceService: InvoiceService) {
    this.purchases = {};
    this.data = {};
    this.itemCount = [];
    this.labels = [];

    this.invoiceService.findPurchasesByServiceGraph().subscribe({
      next: (res) => {
        this.purchases = res.data;

        console.log(this.purchases)

        //splits services and item count
        for (const item of this.purchases)  {
          console.log('Item object')
          console.log(item._id)

          let title = item._id.title;
          let count = item.count;

          this.labels.push(title);
          this.itemCount.push(count);
        }

        //builds object literal for graph
        this.data = {
          labels: this.labels,
          datasets: [
            {
              backgroundColor: [
                '#740001',
                '#ae0001',
                '#BA4422',
                '#FF8C00',
                '#D3A625',
                '#EEBA30',
                '#FFDB58',
                '#D4BC92',
                '#8B4513',
                '#fff',
              ],
              hoverBackgroundColor: [
                '#740001',
                '#ae0001',
                '#BA4422',
                '#FF8C00',
                '#D3A625',
                '#EEBA30',
                '#FFDB58',
                '#D4BC92',
                '#8B4513',
                '#21706',
              ],
              data: this.itemCount
            },
          ]
        };

        console.log('Data object');
        console.log(this.data);
      },
      error: (e) => {
        console.log(e)
      }
    })
   }

  ngOnInit(): void {
  }

}
