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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as customersReducer from './../customers/store/reducer';
import * as carsReducer from './../cars/store/reducer';
import { CustomersEffects } from './../customers/store/effects';
import { CarsEffects } from './../cars/store/effects';
import { UsersEffects } from './../admin/store/effects';
import { StatusesEffects } from './../admin/store/effects';
import * as fromAdmin from './../admin/store';
import * as usersReducer from './../admin/store/reducer/users.reducer';
import * as statusesReducer from './../admin/store/reducer/statuses.reducer';
import * as fromOrders from './../orders/store';
import { LocalizeRouterModule } from '@penleychan/ngx-transloco-router';
import { ClickOutsideDirective } from '../shared/directives/click-outside/click-outside.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionExpirationModalComponent } from './components/session-expiration-modal/session-expiration-modal.component';

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
        LoadingSpinnerComponent,
        ClickOutsideDirective,
        SessionExpirationModalComponent
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
        MatProgressSpinnerModule,
        StoreModule.forFeature('customers', customersReducer.reducer),
        StoreModule.forFeature('cars', carsReducer.reducer),
        StoreModule.forFeature('users', usersReducer.reducer),
        StoreModule.forFeature('statuses', statusesReducer.reducer),
        StoreModule.forFeature('orders', fromOrders.reducer),
        EffectsModule.forFeature([CustomersEffects, CarsEffects, UsersEffects, StatusesEffects, fromOrders.CarsEffects]),
        LocalizeRouterModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [LangComponent, LoadingSpinnerComponent]
})
export class CoreModule {}
