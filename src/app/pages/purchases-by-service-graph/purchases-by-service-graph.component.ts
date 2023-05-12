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

        //splits services and item count
        for (const item of this.purchases) {

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
              borderColor: '#210706',
              borderWidth: 1,
              hoverBorderColor: '#EEBA30',
              hoverBorderWidth: 3,
              hoverOffset: 50,
            },
          ],
        };

        //options for graph
        this.options = {
          layout: {
            padding: {
              left: 20,
              right: 20,
              top: 20,
              bottom: 20,
            },
          },
          plugins: {
            legend: {
              title: {
                display: true,
                text: 'Services',
                font: {
                  size: 24,
                  family: 'Philosopher, sans-serif',
                  weight: 'bold',
                },
                color: '#740001',
              },
              position: 'left',
              labels: {
                font: {
                  size: 14,
                  family: 'Lato, sans-serif',
                  weight: 'bold',
                },
                color: '#740001',
                boxWidth: 20,
                boxHeight: 20,
                padding: 20,
                usePointStyle: true,
                pointStyle: 'triangle',
              },
              align: 'left',
            },
            tooltip: {
              enabled: true,
              backgroundColor: '#740001',
              usePointStyle: true,
              pointStyle: 'triangle',
              titleColor: '#F5DEB3',
              titleFont: {
                size: 14,
                family: 'Lato, sans-serif',
                weight: 'bold',
              },
              bodyColor: '#F5DEB3',
              bodyFont: {
                size: 14,
                family: 'Lato, sans-serif',
                weight: 'bold',
              },
              cornerRadius: 0,
              borderColor: '#F5DEB3',
              borderWidth: 1,
            },
          },
          responsive: true,
        };

      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {
  }

}
