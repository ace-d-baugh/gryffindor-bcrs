/*
=====================================================
; File Name: app.module.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/08/2023
; File Description: App module
; Modifications: Ace Baugh
=====================================================
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

//component imports
import { HomeComponent } from './pages/home/home.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BadRequestComponent } from './pages/bad-request/bad-request.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MatDividerModule } from '@angular/material/divider';
import { MenuModule } from 'primeng/menu';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { VerifyUsernameFormComponent } from './shared/forms/verify-username-form/verify-username-form.component';
import { ResetPasswordFormComponent } from './shared/forms/reset-password-form/reset-password-form.component';
import { VerifySecurityQuestionsFormComponent } from './shared/forms/verify-security-questions-form/verify-security-questions-form.component';
import { ErrorInterceptor } from './shared/error.interceptor';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';
import { ChartModule } from 'primeng/chart';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleDetailsComponent } from './pages/role-details/role-details.component';
import { InvoiceSummaryComponent } from './shared/invoice-summary/invoice-summary.component';
import { MatListModule } from '@angular/material/list';
import { PurchasesByServiceGraphComponent } from './pages/purchases-by-service-graph/purchases-by-service-graph.component';
//module
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthLayoutComponent,
    BaseLayoutComponent,
    LandingComponent,
    SignInComponent,
    UserListComponent,
    SecurityQuestionListComponent,
    SecurityQuestionDetailsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    UserCreateComponent,
    AboutComponent,
    ContactComponent,
    ThankYouComponent,
    UserDetailsComponent,
    BadRequestComponent,
    VerifyUsernameFormComponent,
    ResetPasswordFormComponent,
    VerifySecurityQuestionsFormComponent,
    RegisterComponent,
    RoleListComponent,
    RoleDetailsComponent,
    InvoiceSummaryComponent,
    PurchasesByServiceGraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MessageModule,
    MessagesModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    MatDividerModule,
    MenuModule,
    CommonModule,
    ChartModule,
    MatListModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
