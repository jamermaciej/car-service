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
            component: LoginComponent
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
