/*
=====================================================
; File Name: product.interface.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/03/2023
; File Description: product.interface.ts
; Modifications: John Vanhessche
=====================================================
*/

export interface Product {
    id: number;
    title: string;
    price: number;
    checked: boolean;
}