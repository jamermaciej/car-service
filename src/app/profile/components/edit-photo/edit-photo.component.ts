import { updateUser } from './../../store/actions/profile.actions';
import { Store } from '@ngrx/store';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../../core/services/user/user.service';
import { DialogData } from './../profile/profile.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as fromRoot from './../../../store/reducers';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.scss']
})
export class EditPhotoComponent implements OnInit {
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  files = [];
  downloadURL: string;
  user: User;
  photoURL: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private dialogRef: MatDialogRef<EditPhotoComponent>,
              private afStorage: AngularFireStorage,
              private userService: UserService,
              private af: AngularFireAuth,
              private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.user = this.data.user;
    this.photoURL = this.user?.photoURL;
  }

  uploadFile() {
    const fileInput = this.fileInput.nativeElement;
    fileInput.onchange = () => {
      for (const file of fileInput.files) {
        this.files.push({
          data: file,
          inProgress: false,
          progress: 0
        });
      }
      this.upload();
    };
    fileInput.click();
  }

  private upload() {
    this.fileInput.nativeElement = '';
    this.files.forEach(file => {
      this.callUploadService(file);
    });
  }

  callUploadService(file: FileData) {
    file.inProgress = true;
    const filePath = `uploads/${file.data.name}`;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file.data);

    task.percentageChanges().subscribe(value => {
      file.progress = value;
    });

    task.snapshotChanges().pipe(
        finalize(() => {
          file.inProgress = false;
          fileRef.getDownloadURL().subscribe(url => {
            this.downloadURL = url;
            if (this.photoURL) {
              this.afStorage.storage.refFromURL(this.photoURL).delete();
            }
            this.userService.userFirebase.updateProfile({
              photoURL: url
            });

            const user = {
              ...this.user,
              photoURL: url
            };

            this.store.dispatch(updateUser({ user, alert: true }));

            this.dialogRef.close({ data: 'success' });
          });
        })
    ).subscribe(() => {});
  }

  get header() {
    return this.photoURL ? 'profile.edit_photo.header.edit_photo' : 'profile.edit_photo.header.add_photo';
  }
}

export interface FileData {
  data: File;
  inProgress: boolean;
  progress: number;
}
