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

//import statements
import { SelectedSecurityQuestion } from './selected-security-question.interface';
import { Role } from './role.interface';

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
  role?: Role;
  selectedSecurityQuestions?: SelectedSecurityQuestion[];
}
