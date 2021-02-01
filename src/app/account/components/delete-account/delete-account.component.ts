import { UserService } from './../../../core/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EditPhotoComponent } from 'src/app/profile/components/edit-photo/edit-photo.component';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {
  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private dialogRef: MatDialogRef<EditPhotoComponent>
            ) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.passwordForm.valid ) {
      const { password } = this.passwordForm.value;
      this.userService.deleteAccount(password);
      this.dialogRef.close();
    }
  }
}
