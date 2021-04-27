import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      component: OrdersComponent,
    },
    {
      path: 'add',
      component: AddOrderComponent
    },
    {
      path: ':id',
      component: EditOrderComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
