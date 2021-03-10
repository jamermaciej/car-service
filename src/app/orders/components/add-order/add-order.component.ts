import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerModalComponent } from 'src/app/customers/components/add-customer-modal/add-customer-modal.component';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  orderForm: FormGroup;
  customers = [
    {
      name: 'Maciej'
    },
    {
      name: 'Tomasz'
    }
  ];

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      customer: ['']
    });
  }

  onSubmit() {
    console.log(this.orderForm);
  }

  addCustomer() {
    this.dialog.open(AddCustomerModalComponent, {
      panelClass: 'add-customer-dialog',
      autoFocus: false
    });
  }
}
