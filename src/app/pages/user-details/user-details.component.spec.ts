/*
============================================
, Title: user-details.component.css for BCRS
; Author: Chad ONeal
; Date: 05/08/2023
; Description: css styling for BCRS
===========================================
*/

// imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';

// declare component
describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
    }).compileComponents();

    // create component
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // assert component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
