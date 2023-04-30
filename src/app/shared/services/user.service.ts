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

//import statements
import { Injectable } from "@angular/core";
import { User } from "../models/user.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

//export class
@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private http: HttpClient) {}

    // find all users
    findAllUsers():Observable<any> {
        return this.http.get('/api/users');
    }

    // find user by id
    findUserById(userId: string): Observable<any> {
        return this.http.get('/api/users/' + userId);
    }

    // create user
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

    // update user
    updateUser(userId: string, user: User): Observable<any> {
        return this.http.put('/api/users/' + userId, {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            email: user.email
        })
    }

    // delete user
    deleteUser(userId: string): Observable<any> {
        return this.http.delete('/api/users/' + userId);
    }

    // call findSelectedSecurityQuestions api
    findSelectedSecurityQuestions(username: string): Observable<any> {
      return this.http.get('api/users/' + username + '/security-questions');
    }
}

