import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-add-customer-modal',
  templateUrl: './add-customer-modal.component.html',
  styleUrls: ['./add-customer-modal.component.scss']
})
export class AddCustomerModalComponent implements OnInit {
  customerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      phoneNumber: [''],
      street: [''],
      city: [''],
      idNumber: [''],
      postcode: [''],
      email: [''],
      notes: ['']
    });
  }

  onSubmit() {
    console.log(this.customerForm.value);
    this.customerService.addCustomer(this.customerForm.value);
  }

}
