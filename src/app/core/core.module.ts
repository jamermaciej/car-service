import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TermsComponent } from './components/terms/terms.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
    declarations: [TermsComponent, PageNotFoundComponent],
    imports: [
        CommonModule,
        MatSnackBarModule
    ],
    exports: []
})
export class CoreModule {}
