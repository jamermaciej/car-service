import { Order } from 'src/app/shared/models/order.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataPropertyGetter',
})
export class DataPropertyGetterPipe implements PipeTransform {
  transform(order: Order, keyName: [string]): string | number {
    const getNestedValue = (o, key) => key.split('.').reduce((value, el) => value[el], o);
    let data = '';
    // if (keyName.length === 1) return order[keyName[0]];
    keyName.forEach((k, i) => {
      if (!getNestedValue(order, k)) return;
      data += getNestedValue(order, k);
      if ( i === 0 ) {
        data += ' ';
      }
    });
    return data.trim();
  }
}
