/*
============================================
; Title: verify-security-questions-form.spec.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 04/29/2023
; Description: verify-security-questions-form.spec.ts
===========================================
*/

// import statements
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifySecurityQuestionsFormComponent } from './verify-security-questions-form.component';

// test suite
describe('VerifySecurityQuestionsFormComponent', () => {
  let component: VerifySecurityQuestionsFormComponent;
  let fixture: ComponentFixture<VerifySecurityQuestionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifySecurityQuestionsFormComponent ]
    })
    .compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(VerifySecurityQuestionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
