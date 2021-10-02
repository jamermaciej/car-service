import { Car } from '../../../models/car.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequiredValidator } from 'src/app/shared/validators/required-validator';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { fuel } from 'src/assets/config.json';

@Component({
  selector: 'app-add-car-form',
  templateUrl: './add-car-form.component.html',
  styleUrls: ['./add-car-form.component.scss']
})
export class AddCarFormComponent implements OnInit {
  carForm: FormGroup;
  private _car: Car;
  fuel = fuel;
  filteredFuels: Observable<string[]>;
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
    this.filteredFuels = this.carForm.get('fuel').valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.fuel.filter(f => f.toLowerCase().includes(filterValue));
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
