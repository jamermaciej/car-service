import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/models/customer.model';

@Component({
  selector: 'app-customers-card-list',
  templateUrl: './customers-card-list.component.html',
  styleUrls: ['./customers-card-list.component.scss']
})
export class CustomersCardListComponent implements OnInit {

  @Input() customers: Customer[];

  constructor() { }

  ngOnInit(): void {
  }

}
