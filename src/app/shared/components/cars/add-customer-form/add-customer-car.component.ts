import { Car } from '../../../models/car.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequiredValidator } from 'src/app/shared/validators/required-validator';

@Component({
  selector: 'app-add-car-form',
  templateUrl: './add-car-form.component.html',
  styleUrls: ['./add-car-form.component.scss']
})
export class AddCarFormComponent implements OnInit {
  carForm: FormGroup;
  private _car: Car;
  @Output() triggerSubmit = new EventEmitter();
  @Input() set car(car: Car) {
    this.carForm.patchValue(car);
    this.carForm.disable();
    this._car = car;
  }

  get car() {
    return this._car;
  }

  constructor(private formBuilder: FormBuilder) {
    this.carForm = this.formBuilder.group({
      brand: ['', [RequiredValidator.required]],
      model: ['', [RequiredValidator.required]],
      type: ['', [RequiredValidator.required]],
      year: ['', [RequiredValidator.required]],
      registration: ['', [RequiredValidator.required]],
      mileage: ['', [RequiredValidator.required]],
      vin: ['', [RequiredValidator.required]],
      capacity: ['', [RequiredValidator.required]],
      power: ['', [RequiredValidator.required]],
      fuel: ['', [RequiredValidator.required]]
    });
  }

  ngOnInit(): void {

  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if ( control instanceof FormControl ) {
        control.markAsTouched({ onlySelf: true });
      } else if ( control instanceof FormGroup ) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    if ( this.carForm.valid ) {
      this.triggerSubmit.emit(this.carForm.value);
    } else {
      this.validateAllFormFields(this.carForm);
    }

  }

}
