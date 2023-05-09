/*
============================================
; Title: role.service.ts
; Author: Professor Krasso
; Modified by: John Vanhessche
; Date: 05/08/2023
; Description: role.service.ts
===========================================
*/

//import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Role } from '../models/role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  //class methods

  //find all roles
  findAllRoles(): Observable<any>
  {
    return this.http.get('/api/role');
  }

  //find role by id
  findRoleById(roleId: string): Observable<any>
  {
    return this.http.get('/api/role/' + roleId);
  }

  //create role
  createRole(role: Role): Observable<any>
  {
    return this.http.post(`/api/role`,{
      text: role.text
    });
  }

  //update role
  updateRole(roleId: string, role: Role): Observable<any>
  {
    return this.http.put(`/api/role/${roleId}`, {
      text: role.text,
    });
  }

  //delete role
  deleteRole(roleId: string): Observable<any>
  {
    return this.http.delete(`/api/role/${roleId}`);
  }

  //fund user role
  findUserRole(username: string): Observable<any>
  {
    return this.http.get(`/api/users/${username}/role`).pipe(
      map((res) => {
        return res;
      }
    ));
  }
}
