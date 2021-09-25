import { Customer } from './../../../models/customer.model';
import { Form, FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
