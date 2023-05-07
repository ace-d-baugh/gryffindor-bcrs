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
  options: any;

  constructor(private invoiceService: InvoiceService) {
    this.purchases = {};
    this.data = {};
    this.itemCount = [];
    this.labels = [];

    this.invoiceService.findPurchasesByServiceGraph().subscribe({
      next: (res) => {
        this.purchases = res.data;

        console.log(this.purchases);

        //splits services and item count
        for (const item of this.purchases) {
          console.log('Item object');
          console.log(item._id);

          let title = item._id.title;
          let subtitle = item._id.subtitle;
          let count = item.count;

          this.labels.push(`${title} (${subtitle})`);
          this.itemCount.push(count);
        }

        //builds object literal for graph
        this.data = {
          labels: this.labels,
          datasets: [
            {
              backgroundColor: [
                '#74000188',
                '#EEBA3088',
                '#ae000188',
                '#FFDB5888',
                '#BA442288',
                '#D4BC9288',
                '#FF8C0088',
                '#8B451388',
                '#D3A62588',
              ],
              hoverBackgroundColor: [
                '#740001CC',
                '#EEBA30CC',
                '#ae0001CC',
                '#FFDB58CC',
                '#BA4422CC',
                '#D4BC92CC',
                '#FF8C00CC',
                '#8B4513CC',
                '#D3A625CC',
              ],
              data: this.itemCount,
            },
          ],
        };

        console.log('Data object');
        console.log(this.data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {
  }

}
