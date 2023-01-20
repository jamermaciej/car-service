import { DashboardComponent } from './components/dashbaord/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusesGuard } from '../core/services/statuses-guard/statuses.guard';


const routes: Routes = [
    {
        path: '',
        canActivate: [StatusesGuard],
        component: DashboardComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
