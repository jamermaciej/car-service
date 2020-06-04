import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './components/error-message/error-message/error-message.component';
import { HintComponent } from './components/hint/hint/hint.component';

@NgModule({
    declarations: [ErrorMessageComponent, HintComponent],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule, FormsModule, ErrorMessageComponent, HintComponent
    ]
})
export class SharedModule {}
