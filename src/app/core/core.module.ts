import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TermsComponent } from './terms/terms.component';



@NgModule({
    declarations: [TermsComponent, PageNotFoundComponent],
    imports: [
        CommonModule
    ],
    exports: []
})
export class CoreModule {}
