/*
=====================================================
; File Name: product.service.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/03/2023
; File Description: product.service.ts
; Modifications: John Vanhessche
=====================================================
*/


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
        title: 'Obliviate Memoriam',
        subtitle: 'Password Reset',
        icon: 'password-reset',
        price: 39.99,
        checked: false,
      },
      {
        id: 101,
        title: 'Expelliaramus Infestatio',
        subtitle: 'Spyware Removal',
        icon: 'spyware-removal',
        price: 99.9,
        checked: false,
      },
      {
        id: 102,
        title: 'Accio Computo Potentia',
        subtitle: 'RAM Upgrade',
        icon: 'ram-upgrade',
        price: 129.99,
        checked: false,
      },
      {
        id: 103,
        title: 'Expecto Softwareum',
        subtitle: 'Software Installation',
        icon: 'software-installation',
        price: 49.99,
        checked: false,
      },
      {
        id: 104,
        title: 'Reparo Computum',
        subtitle: 'PC Tune-Up',
        icon: 'pc-tune-up',
        price: 89.99,
        checked: false,
      },
      {
        id: 105,
        title: 'Scourgify Tastaturum',
        subtitle: 'Keyboard Cleaning',
        icon: 'keyboard-cleaning',
        price: 45.0,
        checked: false,
      },
      {
        id: 106,
        title: 'Evanesco Discum',
        subtitle: 'Disk Clean-up',
        icon: 'disk-clean-up',
        price: 149.99,
        checked: false,
      },
      {
        id: 107,
        title: 'Salvio Backupio',
        subtitle: 'Data Backup & Transfer',
        icon: 'data-backup-transfer',
        price: 99.99,
        checked: false,
      },
      {
        id: 108,
        title: 'Reinstallatio Systemus',
        subtitle: 'Operating System Reinstallation',
        icon: 'operating-system-reinstallation',
        price: 109.99,
        checked: false,
      },
    ];
  }

  getProducts() {
    return this.products;
  }
}
