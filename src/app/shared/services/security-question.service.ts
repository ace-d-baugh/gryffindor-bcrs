/*
=====================================================
; File Name: security-question.service.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/22/2023
; File Description: security-question.service.ts
; Modifications: John Vanhessche
=====================================================
*/

import { SecurityQuestion } from "../models/security-question.interface";
import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})

export class SecurityQuestionService {

    constructor(private http: HttpClient) { }

    findAllSecurityQuestion(): Observable<any> {
        return this.http.get('/api/security-questions');
    }

    findSecurityQuestionById(questionId: string): Observable<any> {
        return this.http.get('/api/security-questions/' + questionId);
    }

    createSecurityQuestion(newSecurityQuestion: SecurityQuestion): Observable<any> {
        return this.http.post('/api/security-questions', {
            text: newSecurityQuestion.text
        })
    }

    updateSecurityQuestion(questionId: string, updatedSecurityQuestion: SecurityQuestion): Observable<any> {
        return this.http.put('/api/security-questions/' + questionId, {
            text: updatedSecurityQuestion.text
        })
    }

    deleteSecurityQuestion(questionId: string): Observable<any> {
        return this.http.delete('/api/security-questions/' + questionId)
    }
}
