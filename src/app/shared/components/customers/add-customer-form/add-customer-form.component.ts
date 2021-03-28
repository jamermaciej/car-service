import { Customer } from './../../../models/customer.model';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  onSubmit() {
    console.log(this.customerForm.value);
    this.triggerSubmit.emit(this.customerForm.value);
  }

}
