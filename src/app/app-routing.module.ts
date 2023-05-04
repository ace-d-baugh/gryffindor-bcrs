/*
=====================================================
; File Name: app-routing.module.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 04/18/2023
; File Description: App routing module
; Modifications: Ace Baugh, John Vanhessche, Chad ONeal
=====================================================
*/

// import statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { AuthGuard } from './auth.guard';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { BadRequestComponent } from './pages/bad-request/bad-request.component';
import { VerifyUsernameFormComponent } from './shared/forms/verify-username-form/verify-username-form.component';
import { ResetPasswordFormComponent } from './shared/forms/reset-password-form/reset-password-form.component';
import { VerifySecurityQuestionsFormComponent } from './shared/forms/verify-security-questions-form/verify-security-questions-form.component';
import { RegisterComponent } from './pages/register/register.component';
import { RoleListComponent } from './pages/role-list/role-list.component';

// routes
const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'main',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        // component: ServicesComponent,
        component: HomeComponent, // depricate
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'security-question-list',
        component: SecurityQuestionListComponent,
      },
      {
        path: 'security-question-details/:questionId',
        component: SecurityQuestionDetailsComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'users/create/new',
        component: UserCreateComponent,
      },
      {
        path: 'users/user-details/:userId',
        component: UserDetailsComponent,
      },
      {
        path: 'role-list',
        component: RoleListComponent,
      }
    ],
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'bad-request',
        component: BadRequestComponent,
      },
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
      {
        path: 'server-error',
        component: ServerErrorComponent,
      },
      {
        path: 'forgot',
        component: VerifyUsernameFormComponent,
      },
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionsFormComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordFormComponent,
      },
    ],
  },
  // a 404 page for everything not found
  {
    path: '**',
    redirectTo: 'session/not-found',
  },
];

// export
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
