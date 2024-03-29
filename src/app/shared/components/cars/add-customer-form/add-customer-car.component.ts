import { VinValidator } from './../../../validators/vin-validator';
import { Car } from '../../../models/car.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { RequiredValidator } from 'src/app/shared/validators/required-validator';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import config from 'src/assets/config.json';

@Component({
  selector: 'app-add-car-form',
  templateUrl: './add-car-form.component.html',
  styleUrls: ['./add-car-form.component.scss'],
})
export class AddCarFormComponent implements OnInit {
  @ViewChild('capacity') capacity: ElementRef;
  @ViewChild('mileage') mileage: ElementRef;
  carForm: FormGroup;
  private _car: Car;
  fuel = config.fuel;
  filteredFuels: Observable<string[]>;
  carTypes = config.carTypes;
  filteredCarTypes: Observable<string[]>;
  filteredYears: Observable<string[]>;
  years: string[] = [];
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
      registration: [
        '',
        [
          RequiredValidator.required,
          Validators.minLength(5),
          Validators.maxLength(7),
        ],
      ],
      mileage: ['', [RequiredValidator.required]],
      vin: ['', [RequiredValidator.required, VinValidator.checkVin]],
      capacity: ['', [RequiredValidator.required]],
      power: ['', [RequiredValidator.required]],
      fuel: ['', [RequiredValidator.required]],
    });
  }

  ngOnInit(): void {
    this.filteredFuels = this.carForm.get('fuel').valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(this.fuel, value))
    );

    this.filteredCarTypes = this.carForm.get('type').valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(this.carTypes, value))
    );

    for (let i = new Date().getFullYear(); i >= 1950; i--) {
      this.years.push(i.toString());
    }

    this.filteredYears = this.carForm.get('year').valueChanges.pipe(
      startWith(''),
      map((value) => this.years.filter((v) => v.includes(value)))
    );
  }

  private _filter(list: string[], name: string): string[] {
    const filterValue = name.toLowerCase();

    return list.filter((v) => v.toLowerCase().includes(filterValue));
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  addCapacitySeparator() {
    const value = this.capacity.nativeElement.value.replace(/\s/g, '');
    this.capacity.nativeElement.value = value
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');
  }

  addMileageSeparator() {
    const value = this.mileage.nativeElement.value.replace(/\s/g, '');
    this.mileage.nativeElement.value = value
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');
  }

  onlyNumber(event) {
    const isNumber = /[0-9]/.test(event.key);

    if (!isNumber) {
      event.preventDefault();
    }
  }

  onSubmit() {
    if (this.carForm.valid) {
      this.triggerSubmit.emit(this.carForm.value);
    } else {
      this.validateAllFormFields(this.carForm);
    }
  }
}
