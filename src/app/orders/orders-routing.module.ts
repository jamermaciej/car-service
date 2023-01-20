import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCustomerModalComponent } from '../customers/components/add-customer-modal/add-customer-modal.component';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { StatusesGuard } from '../core/services/statuses-guard/statuses.guard';

const routes: Routes = [
    {
      path: '',
      canActivate: [StatusesGuard],
      children: [
        {
          path: '',
          component: OrdersComponent,
        },
        {
          path: 'add',
          component: AddOrderComponent,
          // children: [
          //   {
          //     path: 'new-customer',
          //     component: ModalContainerComponent,
          //     data: {
          //       component: AddCustomerModalComponent,
          //       panelClass: 'add-customer-dialog',
          //       autoFocus: false
          //     }
          //   }
          // ]
        },
        {
          path: ':id',
          component: EditOrderComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
