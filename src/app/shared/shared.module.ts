import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { AddCarFormComponent } from './components/cars/add-customer-form/add-customer-car.component';
import { StatusFormComponent } from './components/statuses/status-form/status-form.component';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
    declarations: [ErrorMessageComponent, HintComponent, LogoComponent, AddCustomerFormComponent, AddCarFormComponent, StatusFormComponent],
    imports: [
        CommonModule,
        TranslocoModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatOptionModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ErrorMessageComponent,
        HintComponent,
        LogoComponent,
        AddCustomerFormComponent,
        AddCarFormComponent,
        StatusFormComponent,
        TranslocoModule
    ]
})
export class SharedModule {}
