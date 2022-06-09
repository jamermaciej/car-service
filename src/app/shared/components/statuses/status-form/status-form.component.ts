import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Status } from 'src/app/shared/models/status.model';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.scss']
})
export class StatusFormComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  statusForm: FormGroup;
  private _status: Status;
  @Input() set status(status: Status) {
    this._status = status;
    this.statusForm.patchValue(status);
    this.btnLabel = 'status.button.edit';
  }
  get status() {
    return this._status;
  }
  @Output() triggerSubmit = new EventEmitter();
  @Output() triggerClose = new EventEmitter();
  btnLabel = 'status.button.add';

  constructor(private formBuilder: FormBuilder) {
    this.statusForm = this.formBuilder.group({
      label: ['', Validators.required],
      value: ['', Validators.required]
    });

    this.statusForm.get('label').valueChanges.subscribe((v) => {
      this.createValue(v);
    });
  }

  createValue(value: string) {
    const label = value?.toLowerCase().split(' ').join('_');
    this.statusForm.get('value').setValue(label);
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.triggerSubmit.emit(this.statusForm.value);
    this.formDirective.resetForm();
  }

  onClose() {
    this.triggerClose.emit();
  }

}
