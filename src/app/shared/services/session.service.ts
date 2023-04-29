/*
============================================
; Title: user-create.component.css for BCRS
; Author: Professor Krasso
; Modified by: John Vanhessche
; Date: 03/25/2023
; Description: user-create.component.css for BCRS
===========================================
*/

// import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

//  Injectable
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // verify username
  verifysecurityquestions(securityquestions: any) {
    throw new Error('Method not implemented.');
  }
  verifysecurityquestion(securityquestion: any) {
    throw new Error('Method not implemented.');
  }

  //  constructor
  constructor(private http: HttpClient) { }
  /**
   * Description: This function will call the API to login a user
   */
  signin(username: string, password: string): Observable<any> {
    return this.http.post('/api/session/signin', {
      username,
      password
    })
  }

  /**
   * Description: This function will call the register user api
   */
  register(user: User): Observable<any> {
    return this.http.post('/api/session/register', {
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
    })
  }


  // verify username
  verifyusername(username: string): Observable<any>{
    return this.http.get('/api/session/verify/users/' + username);
  }

  // verify-security-questions
  securityquestions(securityquestions: string): Observable<any>{
  return this.http.get('/api/session/verify', { securityquestions });
}

}
