/*
============================================
; Title: error-interceptor.ts
; Author: Professor Krasso
; Modified by: Ace Baugh
; Date: 05/08/2023
; Description: error-interceptor.ts
===========================================
*/

//import statements required for interceptor
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  //intercept method to intercept the http request and handle the error
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([404].indexOf(err.status) !== -1) {
          this.router.navigate(['/session/not-found']);
        }

        if ([400].indexOf(err.status) !== -1) {
          this.router.navigate(['/session/bad-request']);
        }

        if ([500].indexOf(err.status) !== -1) {
          this.router.navigate(['/session/server-error']);
        }

        const error = {
          message: err.error.message || err.message,
          httpCode: err.error.httpCode || err.status,
          url: err.url,
        };

        console.log(
          `httpInterceptor error; origin:${error.url};message:${error.message};httpCode:${error.httpCode}`
        );

        return throwError(() => error);
      })
    );
  }
}
