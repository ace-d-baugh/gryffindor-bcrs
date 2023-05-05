/*
=====================================================
; File Name: invoice.summary.component.spec.ts
; Project: Gryffindor - Bob's Computer Repair Shop
; Author: Richard Krasso
; Date: 05/04/2023
; Modifications: Chad ONeal
=====================================================
*/

//import statements
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceSummaryComponent } from './invoice-summary.component';

//declare and initialize component
describe('InvoiceSummaryComponent', () => {
  let component: InvoiceSummaryComponent;
  let fixture: ComponentFixture<InvoiceSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceSummaryComponent ]
    })
    .compileComponents();

    //create component
    fixture = TestBed.createComponent(InvoiceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //test component
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
