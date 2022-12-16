import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { TranslocoModule } from '@ngneat/transloco';



@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports: [
    ErrorMessageComponent
  ]
})
export class ErrorMessageModule { }
