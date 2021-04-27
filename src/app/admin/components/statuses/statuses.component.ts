import { StatusEditModalComponent } from './../status-edit-modal/status-edit-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { removeStatus } from './../../store/actions/statuses.actions';
import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addStatus } from '../../store/actions';
import { Status } from 'src/app/shared/models/status.model';
import { getStatuses } from '../../store/selectors/statuses.selectors';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusesComponent implements OnInit {
  statuses$: Observable<Status[]>;

  constructor(private formBuilder: FormBuilder,
              private store: Store,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.statuses$ = this.store.select(getStatuses);
  }

  addStatus(status: Status) {
    this.store.dispatch(addStatus({ status }));
  }

  removeStatus(id: number) {
    this.store.dispatch(removeStatus({ id }));
  }

  editStatus(status: Status) {
    this.dialog.open(StatusEditModalComponent, {
      panelClass: 'edit-status-dialog',
      autoFocus: false,
      data: status
    });
  }

}
