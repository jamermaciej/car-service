import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RequiredValidator } from 'src/app/shared/validators/required-validator';
import { addStatus } from '../../store/actions';
import { Status } from 'src/app/shared/models/status.model';
import { getStatuses } from '../../store/selectors/statuses.selectors';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  statusesForm: FormGroup;
  statuses$: Observable<Status[]>;

  constructor(private formBuilder: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.statusesForm = this.formBuilder.group({
      label: ['', Validators.required],
      value: ['', Validators.required]
    });

    this.statuses$ = this.store.select(getStatuses);
  }

  addStatus() {
    const status = this.statusesForm.value;
    this.store.dispatch(addStatus({ status }));
    this.formDirective.resetForm();
  }

}
