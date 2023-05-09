/*
=====================================================
; File Name: security-question.service.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/08/2023
; File Description: security-question.service.ts
; Modifications: John Vanhessche
=====================================================
*/

//import statements
import { SecurityQuestion } from '../models/security-question.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//export class
@Injectable({
  providedIn: 'root',
})

//export class
export class SecurityQuestionService {
  constructor(private http: HttpClient) {}

  // find all security questions
  findAllSecurityQuestions(): Observable<any> {
    return this.http.get('/api/security-questions');
  }

  // find security question by id
  findSecurityQuestionById(questionId: string): Observable<any> {
    return this.http.get('/api/security-questions/' + questionId);
  }

  // create security question
  createSecurityQuestion(
    newSecurityQuestion: SecurityQuestion
  ): Observable<any> {
    return this.http.post('/api/security-questions', {
      text: newSecurityQuestion.text,
    });
  }

  // update security question
  updateSecurityQuestion(
    questionId: string,
    updatedSecurityQuestion: SecurityQuestion
  ): Observable<any> {
    return this.http.put('/api/security-questions/' + questionId, {
      text: updatedSecurityQuestion.text,
    });
  }

  // delete security question
  deleteSecurityQuestion(questionId: string): Observable<any> {
    return this.http.delete('/api/security-questions/' + questionId);
  }
}
