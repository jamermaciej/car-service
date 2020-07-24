import { EditPhotoComponent } from './../edit-photo/edit-photo.component';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  profileForm: FormGroup;

  constructor(private userService: UserService, private dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(15)]],
      phoneNumber: ['']
    });

    this.userService.user$.subscribe(user => {
      this.user = user;

      this.profileForm.patchValue({
        ...user,
        name: user.displayName
      });
    });
  }

  editPhoto() {
    const dialogRef = this.dialog.open(EditPhotoComponent, {
      data: {
        user: this.user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.data}`);
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const { name, phoneNumber } = this.profileForm.value;
      this.userService.updateUserData({
        ...this.user,
        displayName: name,
        phoneNumber
      });
      this.userService.userFirebase.updateProfile({
        displayName: name
      });
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}

export interface DialogData {
  user: User;
}
