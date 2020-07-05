import { LoggedInAuthGuard } from './core/services/loggedin-auth-guard/loggedin-auth-guard.service';
import { AuthGuard } from './core/services/auth-guard/auth-guard.service';
import { TermsComponent } from './core/components/terms/terms.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canLoad: [AuthGuard],
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'cars',
        loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule),
        canLoad: [AuthGuard],
        data: {
          title: 'Cars'
        }
      },
    ]
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule),
    canLoad: [LoggedInAuthGuard],
    data: {
      title: 'Registration'
    }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    data: {
      title: 'Login'
    }
  },
  {
    path: 'terms',
    component: TermsComponent,
    data: {
      title: 'Terms'
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
