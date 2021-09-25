import { IdNumberValidator } from './../../../validators/id_number.validator';
import { PhoneNumberValidator } from './../../../validators/phone-number-validator';
import { AlphaOnlyValidator } from './../../../validators/alpha-only-validator';
import { Customer } from './../../../models/customer.model';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequiredValidator } from 'src/app/shared/validators/required-validator';

@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.scss']
})
export class AddCustomerFormComponent implements OnInit {
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
        postcode: ['']
      }),
      idNumber: ['', [RequiredValidator.required, IdNumberValidator.checkIdNumber]],
      email: ['', [RequiredValidator.required]]
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
    if ( this.customerForm.valid ) {
      this.triggerSubmit.emit(this.customerForm.value);
    } else {
      this.validateAllFormFields(this.customerForm);
    }
  }

}
