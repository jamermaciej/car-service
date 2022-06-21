import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-orders-amount',
  templateUrl: './orders-amount.component.html',
  styleUrls: ['./orders-amount.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersAmountComponent {
  @Input() amount: number;
  @Input() text: string;

  constructor() { }

}
