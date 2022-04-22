import { updateCar } from './../../../store/actions/cars.actions';
import { FlowRoutes } from 'src/app/core/enums/flow';
import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getCar } from 'src/app/cars/store/selectors/cars.selectors';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Car } from 'src/app/shared/models/car.model';
import { go } from 'src/app/store';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Location } from '@angular/common';
import { removeCar } from '../../../store';
import * as routerActions from './../../../../store/actions/router.actions';
import { RequiredValidator } from 'src/app/shared/validators/required-validator';
import { VinValidator } from 'src/app/shared/validators/vin-validator';
import config from 'src/assets/config.json';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss'],
})
export class EditCarComponent implements OnInit, OnDestroy {
  @ViewChild('capacity') capacity: ElementRef;
  @ViewChild('mileage') mileage: ElementRef;
  flotwRoutes: FlowRoutes;
  destroySubject$: Subject<any> = new Subject();
  car: Car;
  carForm: FormGroup;
  filteredFuels: Observable<string[]>;
  filteredCarTypes: Observable<string[]>;
  filteredYears: Observable<string[]>;

  fuel = config.fuel;
  carTypes = config.carTypes;
  years: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private location: Location,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
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

    const id = +this.route.snapshot.paramMap.get('id');
    this.store
      .select(getCar, { id })
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((car) => {
        if (car) {
          this.car = car;
          this.carForm.patchValue(car);
        } else {
          this.store.dispatch(go({ path: [FlowRoutes.CARS] }));
        }
      });

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

  onSubmit() {
    if (this.carForm.valid) {
      const { id } = this.car;
      const car = {
        id,
        ...this.carForm.value,
      };
      this.store.dispatch(updateCar({ car }));
    } else {
      this.validateAllFormFields(this.carForm);
    }
  }

  back(): void {
    this.location.back();
  }

  removeCar(car: Car) {
    this.store.dispatch(removeCar({ car }));
    this.store.dispatch(go({ path: [FlowRoutes.CARS] }));
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
