/*
============================================
; Title: verify-username-form.component.spec.ts
; Author: Professor Krasso
; Modified by: John Vanhessche
; Date: 05/08/2023
; Description: verify-username-form.component.spec.ts
===========================================
*/

// import statements
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyUsernameFormComponent } from './verify-username-form.component';

// test suite
describe('VerifyUsernameFormComponent', () => {
  let component: VerifyUsernameFormComponent;
  let fixture: ComponentFixture<VerifyUsernameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifyUsernameFormComponent],
    }).compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(VerifyUsernameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
