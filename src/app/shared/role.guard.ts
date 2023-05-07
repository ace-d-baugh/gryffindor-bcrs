/*
============================================
; Title: role.guard.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 05/06/2023
; Description: role.guard.ts for BCRS
============================================
*/

import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { map, Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { RoleService } from "./services/role.service";
import { Role } from './models/role.interface';

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private roleService: RoleService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    console.log("Session User Name " + this.cookieService.get('sessionUser'));
    return this.roleService.findUserRole(this.cookieService.get("sessionUser")).pipe(
      map((res) => {
        console.log('Role Guard');
        console.log(res.data);
        const userRole = res.data.text;
        if (userRole === "admin") {
          return true;
        } else {
          return this.router.createUrlTree(['/main']);
        }
      })
    );
  }

}
