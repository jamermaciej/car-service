import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './components/error-message/error-message/error-message.component';
import { HintComponent } from './components/hint/hint/hint.component';
import { LogoComponent } from './components/logo/logo.component';
import { TranslocoModule } from '@ngneat/transloco';
import { AddCustomerFormComponent } from './components/customers/add-customer-form/add-customer-form.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [ErrorMessageComponent, HintComponent, LogoComponent, AddCustomerFormComponent],
    imports: [
        CommonModule,
        TranslocoModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule
    ],
    exports: [
        CommonModule, FormsModule, ErrorMessageComponent, HintComponent, LogoComponent, AddCustomerFormComponent
    ]
})
export class SharedModule {}
