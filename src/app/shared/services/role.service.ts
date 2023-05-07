/*
============================================
; Title: role.service.ts
; Author: Professor Krasso
; Modified by: John Vanhessche
; Date: 05/04/2023
; Description: role.service.ts
===========================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Role } from '../models/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {  }

  findAllRoles(): Observable<any>
  {
    return this.http.get('/api/role');
  }

  findRoleById(roleId: string): Observable<any>
  {
    return this.http.get('/api/role/' + roleId);
  }

  createRole(role: Role): Observable<any>
  {
    return this.http.post(`/api/role`,{
      text: role.text
    });
  }

  updateRole(roleId: string, role: Role): Observable<any>
  {
    return this.http.put(`/api/role/${roleId}`, {
      text: role.text
    });
  }

  deleteRole(roleId: string): Observable<any>
  {
    return this.http.delete(`/api/role/${roleId}`);
  }

  findUserRole(userName: string): Observable<any>
  {
    return this.http.get(`/api/users/${userName}/role`).pipe(
      map((res) => {
        return res;
      }
    ));
}
}
