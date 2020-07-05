import { TranslocoModule } from '@ngneat/transloco';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TermsComponent } from './components/terms/terms.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LangComponent } from './components/lang/lang.component';
import { MatSelectModule } from '@angular/material/select';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
    declarations: [
        TermsComponent,
        PageNotFoundComponent,
        LangComponent,
        LayoutComponent,
        FooterComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        MatSnackBarModule,
        MatSelectModule,
        TranslocoModule,
        RouterModule
    ],
    exports: [LangComponent]
})
export class CoreModule {}
