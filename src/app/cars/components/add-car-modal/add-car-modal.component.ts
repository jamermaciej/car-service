import { Car } from './../../../shared/models/car.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import * as fromCars from './../../store';

@Component({
  selector: 'app-add-customer-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrls: ['./add-car-modal.component.scss']
})
export class AddCarModalComponent implements OnInit {

  constructor(private store: Store<fromCars.State>,
              private dialogRef: MatDialogRef<AddCarModalComponent>,
            ) { }

  ngOnInit(): void {

  }

  addCar(car: Car) {
    this.store.dispatch(fromCars.addCar({ car }));
    this.dialogRef.close();
  }

}
