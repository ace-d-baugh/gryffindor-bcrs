/*
============================================
; Title: session.service.ts for BCRS
; Author: Professor Krasso
; Modified by: Ace Baugh
; Date: 04/24/2023
; Description: session.service.ts for BCRS
===========================================
*/

//import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//  Injectable
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  //  signin
  signIn(username: string, password: string): Observable<any> {
    return this.http.post('/api/session/signin', {
      username,
      password
    })
  }
}
