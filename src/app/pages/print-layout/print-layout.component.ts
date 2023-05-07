import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css']
})
export class PrintLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cancel() 
  {
    //cancel takes the user back to the invoice-summary.
    this.router.navigate(['/main//shared/invoice-summary'])
  }


}
