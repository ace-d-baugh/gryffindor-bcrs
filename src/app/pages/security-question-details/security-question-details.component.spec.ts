/*
============================================
; Title: not-found.component.css for BCRS
; Author: Professor Krasso
; Modified by: John Vanhessche
; Date: 05/08/2023
; Description: not-found.component.css for BCRS
===========================================
*/

//import statements
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityQuestionDetailsComponent } from './security-question-details.component';

//component
describe('SecurityQuestionDetailsComponent', () => {
  let component: SecurityQuestionDetailsComponent;
  let fixture: ComponentFixture<SecurityQuestionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecurityQuestionDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityQuestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it statement
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
