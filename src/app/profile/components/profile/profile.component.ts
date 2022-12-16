import * as profileActions from './../../store/actions/profile.actions';
import { Store } from '@ngrx/store';
import { EditPhotoComponent } from './../edit-photo/edit-photo.component';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getUser } from 'src/app/store/selectors/auth.selectors';
import * as fromRoot from './../../../store/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  profileForm: FormGroup;
  users: User[];

  constructor(private userService: UserService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private store: Store<fromRoot.State>) {
              }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(15)]],
      phoneNumber: ['']
    });

    this.store.select(getUser).subscribe(user => {
      this.user = user;

      this.profileForm.patchValue({
        ...user,
        name: user?.displayName
      });
    });

    // code added only for learn test component
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.userService.getUserData(user.uid).subscribe(user => this.user = user);
    }
    this.userService.getUsersData().subscribe(user => this.users = user);
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
      const user = {
        ...this.user,
        displayName: name,
        phoneNumber
      };
      this.store.dispatch(profileActions.updateUser({ user, alert: true }));

      this.userService.updateProfile(name);
      this.profileForm.markAsPristine();
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  get emailStatus() {
    return this.user.emailVerified ? 'profile.email_status.verified' : 'profile.email_status.unverified';
  }

  get button() {
    return this.user.photoURL ? 'profile.update_profile.button.change_photo' : 'profile.update_profile.button.add_photo';
  }
}

export interface DialogData {
  user: User;
}
