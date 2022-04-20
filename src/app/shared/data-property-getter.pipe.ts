import { Order } from 'src/app/shared/models/order.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataPropertyGetter',
})
export class DataPropertyGetterPipe implements PipeTransform {
  transform(order: Order, keyName: [string]): string | number {
    const getNestedValue = (o, key) => (key.split('.').reduce((value, el) => value[el], o));
    let data = '';
    keyName.forEach((k, i) => {
      data += getNestedValue(order, k);
      if ( i === 0 ) {
        data += ' ';
      }
    });
    return data;
  }
}
