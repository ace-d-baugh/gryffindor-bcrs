/*
=====================================================
; File Name: user.interface.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/20/2023
; File Description: user.interface.ts
; Modifications: John Vanhessche
=====================================================
*/

export interface User {
    _id?: string;
    username: string;
    password?: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    address: string;
    email: string
}