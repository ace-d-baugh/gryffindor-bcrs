/*
============================================
; Title: user-create.component.css for BCRS
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 03/25/2023
; Description: user-create.component.css for BCRS
===========================================
*/

// import statements
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCreateComponent } from './user-create.component';

// component
describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateComponent ]
    })
    .compileComponents();

    //import statements
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it statement
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
