/*
============================================
; Title: auth.guard.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 04/23/2023
; Description: auth.guard.ts for BCRS
============================================
*/

// import statements
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

// injectable
@Injectable({
  providedIn: 'root'
})

// export class
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {

  }
  // can activate
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // check if session user exists
    const sessionUser = this.cookieService.get('session_user')
    if (sessionUser) {
      return true
    } else {
      this.router.navigate(['/session/sign-in'])
      return false
    }
  }

}
