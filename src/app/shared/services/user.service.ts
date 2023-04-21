/*
=====================================================
; File Name: user.service.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/20/2023
; File Description: user.service.ts
; Modifications: John Vanhessche
=====================================================
*/

import { Injectable } from "@angular/core";
import { User } from "../models/user.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    
    constructor(private http: HttpClient) {}

    findAllUsers():Observable<any> {
        return this.http.get('/api/users');
    }

    findUserById(userId: string): Observable<any> {
        return this.http.get('/api/users' + userId);
    }

    createUser(user: User): Observable<any> {
        return this.http.post('/api/users', {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            email: user.email
        })
    }

    updateUser(userId: string, user: User): Observable<any> {
        return this.http.put('/api/users/' + userId, {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            email: user.email
        })
    }

    deleteUser(userId: string): Observable<any> {
        return this.http.delete('/api/users' + userId);
    }
}