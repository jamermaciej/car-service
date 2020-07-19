import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfiledRoutingModule } from './profile-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { EditPhotoComponent } from './components/edit-photo/edit-photo.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ProfileComponent, EditPhotoComponent],
  imports: [
    CommonModule,
    ProfiledRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule
  ]
})
export class ProfileModule { }
