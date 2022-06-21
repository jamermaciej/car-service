import { Status } from 'src/app/shared/models/status.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { updateStatus } from '../../store';
import { State } from './../../store/reducer/statuses.reducer';

@Component({
  selector: 'app-status-edit-modal',
  templateUrl: './status-edit-modal.component.html',
  styleUrls: ['./status-edit-modal.component.scss']
})
export class StatusEditModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Status,
              private store: Store<State>,
              private dialogRef: MatDialogRef<StatusEditModalComponent>) { }

  ngOnInit(): void {

  }

  editStatus(status: Status) {
    const statusData = {
      id: this.data.id,
      ...status
    };
    this.store.dispatch(updateStatus({ status: statusData }));

    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
