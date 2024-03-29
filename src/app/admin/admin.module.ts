import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { UsersComponent } from './components/users/users.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { StatusesComponent } from './components/statuses/statuses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusEditModalComponent } from './components/status-edit-modal/status-edit-modal.component';

@NgModule({
  declarations: [AdminComponent, UsersComponent, StatusesComponent, StatusEditModalComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    SharedModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    TranslocoLocaleModule
  ]
})
export class AdminModule { }
