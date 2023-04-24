/*
============================================
; Title: session.service.spec.ts for BCRS
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 04/24/2023
; Description: session.service.spec.ts for BCRS
===========================================
*/

// import statements
import { TestBed } from '@angular/core/testing';
import { SessionService } from './services/session.service';

// component
describe('SessionService', () => {
  let service: SessionService;

  //
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  //  it statement
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
