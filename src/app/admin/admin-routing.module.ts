import { StatusesComponent } from './components/statuses/statuses.component';
import { UsersComponent } from './components/users/users.component';
import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusesGuard } from '../core/services/statuses-guard/statuses.guard';


const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
          {
            path: '',
            redirectTo: 'users',
            pathMatch: 'full',
          },
          {
            path: 'users',
            component: UsersComponent
          },
          {
            path: 'statuses',
            component: StatusesComponent,
            canActivate: [StatusesGuard]
          },
          {
            path: 'notifications',
            loadChildren: () =>
            import('./../notifications/notifications.module').then((m) => m.NotificationsModule),
          }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
