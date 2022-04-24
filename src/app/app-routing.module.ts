import { LoggedInAuthGuard } from './core/services/loggedin-auth-guard/loggedin-auth-guard.service';
import { AuthGuard } from './core/services/auth-guard/auth-guard.service';
import { TermsComponent } from './core/components/terms/terms.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, CanLoad } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { Role } from './core/enums/roles';
import { UserRoleGuard } from './core/services/user-role-guard/user-role-guard.service';
import { localizeRouterConfig, LocalizeRouterModule, LOCALIZE_ROUTER_CONFIG } from '@penleychan/ngx-transloco-router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canLoad: [UserRoleGuard],
        data: {
          title: 'Admin',
          roles: Role.ADMIN,
        },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
        data: {
          title: 'Profile',
        },
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
        data: {
          title: 'Account',
        },
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/orders.module').then((m) => m.OrdersModule),
        data: {
          title: 'Orders',
        },
      },
      {
        path: 'cars',
        loadChildren: () =>
          import('./cars/cars.module').then((m) => m.CarsModule),
        data: {
          title: 'Cars',
        },
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./customers/customers.module').then((m) => m.CustomersModule),
        data: {
          title: 'Customers',
        },
      },
    ],
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
    canLoad: [LoggedInAuthGuard],
    data: {
      title: 'Registration',
    },
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    data: {
      title: 'Login',
    },
  },
  {
    path: 'terms',
    component: TermsComponent,
    data: {
      title: 'Terms',
    },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, relativeLinkResolution: 'legacy' }), LocalizeRouterModule.forRoot(routes)],
  exports: [RouterModule, LocalizeRouterModule],
  providers: [
    {
      provide: LOCALIZE_ROUTER_CONFIG,
      useValue: localizeRouterConfig({
        translateRoute: true
      })
    }
  ]
})
export class AppRoutingModule {}
