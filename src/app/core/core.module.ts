import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
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
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';

@NgModule({
    declarations: [
        TermsComponent,
        PageNotFoundComponent,
        LangComponent,
        LayoutComponent,
        FooterComponent,
        HeaderComponent,
        SidebarComponent,
        MenuListItemComponent,
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule,
        MatSnackBarModule,
        MatSelectModule,
        TranslocoModule,
        RouterModule,
        MatSidenavModule,
        MatIconModule,
        MatBadgeModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ],
    exports: [LangComponent, LoadingSpinnerComponent]
})
export class CoreModule {}
