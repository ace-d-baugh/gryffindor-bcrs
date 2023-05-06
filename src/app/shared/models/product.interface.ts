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

// Export interface
export interface Product {
    id: number;
    title: string;
    subtitle: string;
    icon: string;
    price: number;
    labor: number;
    checked: boolean;
}
