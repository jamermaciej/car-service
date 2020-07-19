import { Roles } from './../core/enums/roles';
import { AuthGuard } from './../core/services/auth-guard/auth-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashbaord/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    // {
    //   path: 'admin',
    //   component: AdminComponent,
    //   canActivate: [AuthGuard],
    //   data: { roles: Roles.ADMIN }
    // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
