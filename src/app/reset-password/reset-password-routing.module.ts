import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmPasswordResetComponent } from './components/confirm-password-reset/confirm-password-reset.component';


const routes: Routes = [
    {
        path: '',
        component: ConfirmPasswordResetComponent,
    },
    {
        path: ':token',
        component: ConfirmPasswordResetComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }
