import { removeStatus } from './../../store/actions/statuses.actions';
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

    this.statusesForm.get('label').valueChanges.subscribe((v) => {
      this.createValue(v);
    });
  }

  createValue(value: string) {
    const label = value?.toLowerCase().split(' ').join('_');
    this.statusesForm.get('value').setValue(label);
  }

  addStatus() {
    const status = this.statusesForm.value;
    console.log(status);
    this.store.dispatch(addStatus({ status }));
    this.formDirective.resetForm();
  }

  removeStatus(id: number) {
    this.store.dispatch(removeStatus({ id }));
  }

  editStatus(id: number) {

  }

}
