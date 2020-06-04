import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './components/error-message/error-message/error-message.component';

@NgModule({
    declarations: [ErrorMessageComponent],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule, FormsModule, ErrorMessageComponent
    ]
})
export class SharedModule {}
