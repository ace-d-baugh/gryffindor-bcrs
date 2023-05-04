import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  products: Product[];

  constructor() {
    this.products = [
      {
        id: 100,
        title: 'Obliviate Memoriam (Password Reset)',
        price: 39.99,
        checked: false
      },
      {
        id: 101,
        title: 'Expelliaramus Infestatio (Spyware Removal)',
        price: 99.90,
        checked: false
      },
      {
        id: 102,
        title: 'Accio Computo Potentia (RAM Upgrage)',
        price: 129.99,
        checked: false
      },
      {
        id: 103,
        title: 'Expecto Softwareum (Software Installation)',
        price: 49.99,
        checked: false
      },
      {
        id: 104,
        title: 'Reparo Computum (PC Tune-Up)',
        price: 89.99,
        checked: false
      },
      {
        id: 105,
        title: 'Scourgify Tastaturum (45.00)',
        price: 129.99,
        checked: false
      },
      {
        id: 106,
        title: 'Evanesco Discum (Disk Clean-up)',
        price: 149.99,
        checked: false
      },
      {
        id: 107,
        title: 'Salvio Backupio (Data Backup & Transfer)',
        price: 129.99,
        checked: false
      },
      {
        id: 108,
        title: 'Reinstallatio Systemus (Operating System Reinstallation)',
        price: 129.99,
        checked: false
      }
    ]
   }
}
