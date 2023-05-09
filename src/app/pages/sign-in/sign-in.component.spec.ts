/*
============================================
; Title: sign-in.component.css for BCRS
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 05/08/2023
; Description: sign-in.component.css for BCRS
===========================================
*/

//import statements
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';

//component
describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it statement
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
