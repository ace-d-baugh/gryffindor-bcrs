/*
============================================
; Title: app.component.css for BCRS
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 05/08/2023
; Description: app.component.css for BCRS
===========================================
*/

//import statements
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityQuestionListComponent } from './security-question-list.component';

//component
describe('SecurityQuestionListComponent', () => {
  let component: SecurityQuestionListComponent;
  let fixture: ComponentFixture<SecurityQuestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecurityQuestionListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it statement
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
