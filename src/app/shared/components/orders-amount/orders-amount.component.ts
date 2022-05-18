import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-amount',
  templateUrl: './orders-amount.component.html',
  styleUrls: ['./orders-amount.component.scss']
})
export class OrdersAmountComponent implements OnInit {
  @Input() amount: number;
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
