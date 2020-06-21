import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './components/error-message/error-message/error-message.component';
import { HintComponent } from './components/hint/hint/hint.component';
import { LogoComponent } from './components/logo/logo.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    declarations: [ErrorMessageComponent, HintComponent, LogoComponent],
    imports: [
        CommonModule,
        TranslocoModule
    ],
    exports: [
        CommonModule, FormsModule, ErrorMessageComponent, HintComponent, LogoComponent
    ]
})
export class SharedModule {}
