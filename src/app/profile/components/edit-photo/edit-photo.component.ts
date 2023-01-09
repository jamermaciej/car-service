import { Store } from '@ngrx/store';
import { User } from './../../../shared/models/user.model';
import { DialogData } from './../profile/profile.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import * as fromRoot from './../../../store/reducers';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.scss']
})
export class EditPhotoComponent implements OnInit {
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  user: User;
  photoURL: string = './../../../assets/images/user-placeholder.jpg';
  file: File;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private dialogRef: MatDialogRef<EditPhotoComponent>,
              private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.user = this.data.user;
    if (this.user?.photo) {
      this.photoURL = this.user?.photo;
    }
  }

  uploadFile() {
    const fileInput = this.fileInput.nativeElement;

    fileInput.onchange = () => {
      this.file = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.photoURL = reader.result as string;
      }
      reader.readAsDataURL(fileInput.files[0]);
    };
    fileInput.click();
  }

  updatePhoto() {
   this.dialogRef.close({ photo: this.file });
  }

  get header() {
    return this.photoURL ? 'profile.edit_photo.header.edit_photo' : 'profile.edit_photo.header.add_photo';
  }
}
