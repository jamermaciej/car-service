import {
  removeCustomer,
  updateCustomer,
} from './../../store/actions/customers.actions';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { FlowRoutes } from 'src/app/core/enums/flow';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { getCustomer } from '../../store/selectors/customers.selectors';
import { Observable, Subject } from 'rxjs';
import { go } from 'src/app/store';
import { Customer } from 'src/app/shared/models/customer.model';
import { RequiredValidator } from 'src/app/shared/validators/required-validator';
import { AlphaOnlyValidator } from 'src/app/shared/validators/alpha-only-validator';
import { PhoneNumberValidator } from 'src/app/shared/validators/phone-number-validator';
import { PostcodeValidator } from 'src/app/shared/validators/postcode-validation';
import { EmailValidator } from 'src/app/shared/validators/email-validator';
import config from 'src/assets/config.json';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit, OnDestroy {
  FlowRoutes = FlowRoutes;
  destroySubject$: Subject<any> = new Subject();
  customerForm: FormGroup;
  customer: Customer;
  @ViewChild('postcode') postcode: ElementRef;
  provinces = config.provinces;
  filteredProvinces: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: [
        '',
        [
          RequiredValidator.required,
          Validators.maxLength(30),
          AlphaOnlyValidator.alphaOnly,
        ],
      ],
      surname: [
        '',
        [
          RequiredValidator.required,
          Validators.maxLength(30),
          AlphaOnlyValidator.alphaOnly,
        ],
      ],
      phoneNumber: [
        '',
        [RequiredValidator.required, PhoneNumberValidator.checkPhoneNumber],
      ],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        province: [''],
        postcode: ['', [PostcodeValidator.checkPostcode]],
      }),
      idNumber: ['', [RequiredValidator.required]],
      email: ['', [RequiredValidator.required, EmailValidator.validateEmail]],
    });

    const id = +this.route.snapshot.paramMap.get('id');
    this.store
      .select(getCustomer, { id })
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((customer) => {
        if (customer) {
          this.customer = customer;
          this.customerForm.patchValue(customer);
        } else {
          this.store.dispatch(go({ path: [FlowRoutes.CUSTOMERS] }));
        }
      });

    this.filteredProvinces = this.customerForm
      .get('address.province')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.provinces.filter((province) =>
      province.toLowerCase().includes(filterValue)
    );
  }

  validPostcode(event) {
    const isNumber = /[0-9]/.test(event.key);

    if (!isNumber) {
      event.preventDefault();
    }

    if (event.target.value.length === 2) {
      this.postcode.nativeElement.value += '-';
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
    if (this.customerForm.valid) {
      const { id } = this.customer;
      const customer = {
        id,
        ...this.customerForm.value,
      };
      this.store.dispatch(updateCustomer({ customer }));
    } else {
      this.validateAllFormFields(this.customerForm);
    }
  }

  back(): void {
    this.location.back();
  }

  removeCustomer(customer: Customer) {
    this.store.dispatch(removeCustomer({ customer }));
    this.store.dispatch(go({ path: [FlowRoutes.CUSTOMERS] }));
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
