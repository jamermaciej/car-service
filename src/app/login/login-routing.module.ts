import { LoggedInAuthGuard } from './../core/services/loggedin-auth-guard/loggedin-auth-guard.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirebaseModeContainerComponent } from './components/firebase-mode-container/firebase-mode-container.component';


const routes: Routes = [
    {
        path: '',
        children: [
          {
            path: '',
            component: LoginComponent,
            canActivate: [LoggedInAuthGuard]
          },
          {
            path: 'auth',
            component: FirebaseModeContainerComponent
          }
        ]
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
