/*
============================================
; Title: session.service.ts
; Author: Professor Krasso
; Modified by: John Vanhessche
; Date: 05/02/2023
; Description: session.service.ts
===========================================
*/

// import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { VerifySecurityQuestionModel } from '../models/verify-security-question.interface';

//  Injectable
@Injectable({
  providedIn: 'root',
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
  constructor(private http: HttpClient) {}
  /**
   * Description: This function will call the API to login a user
   */
  signin(username: string, password: string): Observable<any> {
    return this.http.post('/api/session/signin', {
      username,
      password,
    });
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
      selectedSecurityQuestions: user.selectedSecurityQuestions,
    });
  }

  // verify username
  verifyUsername(username: string): Observable<any> {
    return this.http.get('/api/session/verify/users/' + username);
  }

  updatePassword(password: string, username: string): Observable<any> {
    return this.http.post(
      '/api/session/users/' + username + '/reset-password',
      {
        password,
      }
    );
  }

  // verify security questions
  verifySecurityQuestions(
    model: VerifySecurityQuestionModel,
    username: String
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
}
