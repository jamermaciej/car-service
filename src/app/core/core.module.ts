import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TermsComponent } from './components/terms/terms.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LangComponent } from './components/lang/lang.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
    declarations: [TermsComponent, PageNotFoundComponent, LangComponent],
    imports: [
        CommonModule,
        MatSnackBarModule,
        MatSelectModule
    ],
    exports: [LangComponent]
})
export class CoreModule {}
