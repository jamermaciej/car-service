import { MatInput } from '@angular/material/input';
import { PostcodeValidator } from './../../../validators/postcode-validation';
import { EmailValidator } from './../../../validators/email-validator';
import { IdNumberValidator } from './../../../validators/id_number.validator';
import { PhoneNumberValidator } from './../../../validators/phone-number-validator';
import { AlphaOnlyValidator } from './../../../validators/alpha-only-validator';
import { Customer } from './../../../models/customer.model';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { RequiredValidator } from 'src/app/shared/validators/required-validator';

@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.scss']
})
export class AddCustomerFormComponent implements OnInit {
  @ViewChild('postcode') postcode: ElementRef;
  customerForm: FormGroup;
  private _customer: Customer;
  @Output() triggerSubmit = new EventEmitter();
  @Input() set customer(customer: Customer) {
    this.customerForm.patchValue(customer);
    this.customerForm.disable();
    this._customer = customer;
  }

  get customer() {
    return this._customer;
  }

  constructor(private formBuilder: FormBuilder) {
    this.customerForm = this.formBuilder.group({
      name: ['', [RequiredValidator.required, Validators.maxLength(30), AlphaOnlyValidator.alphaOnly]],
      surname: ['', [RequiredValidator.required, Validators.maxLength(30), AlphaOnlyValidator.alphaOnly]],
      phoneNumber: ['', [RequiredValidator.required, PhoneNumberValidator.checkPhoneNumber]],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        province: [''],
        postcode: ['', [PostcodeValidator.checkPostcode]]
      }),
      idNumber: ['', [RequiredValidator.required, IdNumberValidator.checkIdNumber]],
      email: ['', [RequiredValidator.required, EmailValidator.validateEmail]]
    });
  }

  ngOnInit(): void {

  }

  validPostcode(event) {
    const isNumber = /[0-9]/.test(event.key);

    if ( !isNumber) {
      event.preventDefault();
    }

    if ( event.target.value.length === 2 ) {
      this.postcode.nativeElement.value += '-';
    }
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
    if ( this.customerForm.valid ) {
      this.triggerSubmit.emit(this.customerForm.value);
    } else {
      this.validateAllFormFields(this.customerForm);
    }
  }

}
