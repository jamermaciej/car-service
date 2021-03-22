import { Car } from './../../../shared/models/car.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-customer-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrls: ['./add-car-modal.component.scss']
})
export class AddCarModalComponent implements OnInit {

  constructor(
              private dialogRef: MatDialogRef<AddCarModalComponent>,
            ) { }

  ngOnInit(): void {

  }

  addCar(car: Car) {
    // this.store.dispatch(fromCustomers.addCustomer({ customer }));
    this.dialogRef.close();
  }

}
