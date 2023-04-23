/*
=====================================================
; File Name: app-routing.module.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/18/2023
; File Description: App routing module
; Modifications: Ace Baugh, John Vanhessche
=====================================================
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'other',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
      },
    ],
  },
  {
    path: 'session',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'session/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
