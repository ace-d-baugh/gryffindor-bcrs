/*
=====================================================
; File Name: main.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/08/2023
; File Description: Main file
; Modifications: Ace Baugh
=====================================================
*/

// The browser platform with a compiler
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// The app module
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// global current year variable
export const currentYear: number = new Date().getFullYear();

// Enable production mode unless running locally
if (environment.production) {
  enableProdMode();
}

// Compile and launch the module
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
