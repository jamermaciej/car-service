import { Car } from '../../../models/car.model';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      name: ['', [RequiredValidator.required]],
      surname: ['', [RequiredValidator.required]],
      phoneNumber: ['', [RequiredValidator.required]],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        province: [''],
        postcode: ['']
      }),
      idNumber: ['', [RequiredValidator.required]],
      email: ['', [RequiredValidator.required]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.carForm.value);
    this.triggerSubmit.emit(this.carForm.value);
  }

}
