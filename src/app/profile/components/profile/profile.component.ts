import { EditPhotoComponent } from './../edit-photo/edit-photo.component';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
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
}

export interface DialogData {
  user: User;
}
