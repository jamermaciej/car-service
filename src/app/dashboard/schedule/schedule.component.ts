import { Component, Input, OnInit } from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() data: Order[];
  public setView: View = 'Month';
  public eventObject: EventSettingsModel = {
    fields: {
      subject: {
        name: 'customer'
      },
      startTime: {
        name: 'delivery_date'
      },
      endTime: {
        name: 'deadline'
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.eventObject.dataSource = this.data.map((order: Order) => {
      const user = order.user.displayName ? `(${order.user.displayName})` : '';
      return {
        ...order,
        customer: `${order.customer.name} ${order.customer.surname} ${user}`,
        IsAllDay: true
      };
    });
  }

}
