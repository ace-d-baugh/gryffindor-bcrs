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

//export interface
export interface User {
  _id?: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  role?: string;
  selectedSecurityQuestions?: any;
}
