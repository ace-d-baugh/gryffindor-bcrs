/*
============================================
; Title: session.service.ts for BCRS
; Author: Professor Krasso
; Modified by: Ace Baugh
; Date: 04/30/2023
; Description: session.service.ts for BCRS
===========================================
*/

//import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VerifySecurityQuestionModel } from './models/verify-security-question.interface';
import { User } from './models/user.interface';

//  Injectable
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) {}

  //  signin
  signIn(username: string, password: string): Observable<any> {
    return this.http.post('/api/session/signin', {
      username,
      password,
    });
  }

  // register
  register(user: User): Observable<any> {
    return this.http.post('/api/session/register', {
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
      role: user.role,
      selectedSecurityQuestions: user.selectedSecurityQuestions,
    });
  }

  verifyUsername(username: string): Observable<any> {
    return this.http.get('/api/session/verify/users/' + username);
  }

  verifySecurityQuestions(
    model: VerifySecurityQuestionModel,
    username: string
  ): Observable<any> {
    return this.http.post(
      '/api/session/verify/users/' + username + '/security-questions',
      {
        questionText1: model.question1,
        questionText2: model.question2,
        questionText3: model.question3,
        answerText1: model.answerToQuestion1,
        answerText2: model.answerToQuestion2,
        answerText3: model.answerToQuestion3,
      }
    );
  }

  updatePassword(username: string, password: string): Observable<any> {
    return this.http.put('/api/session/users/' + username + '/reset-password', {
      password,
    });
  }
}
