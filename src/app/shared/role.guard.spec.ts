/*
============================================
; Title: role.guard.spec.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 05/06/2023
; Description: role.guard.spec.ts for BCRS
============================================
*/

// import statements
import { TestBed } from '@angular/core/testing';
import { RoleGuard } from './role.guard';

// component
describe('RoleGuard', () => {
  let guard: RoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleGuard);
  });

  //  it statement
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
