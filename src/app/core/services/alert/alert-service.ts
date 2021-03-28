import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) {
  }

  showAlert(message: string, panelClass: string, duration = 2000) {
    this.snackBar.open(message, '', {
        duration,
        panelClass
      });
  }
}
