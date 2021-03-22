import { Car } from './../../shared/models/car.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrService {
  customer$: Observable<Car>;

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Car[]> {
    return this.http.get<Car[]>('http://localhost:3001/cars');
  }

  getCustomer(uid: string): Observable<Car> {
    return this.http.get<Car>(`http://localhost:3001/cars/${uid}`);
  }

  addCustomer(car: Car): Observable<Car> {
    return this.http.post<Car>('http://localhost:3001/cars', car);
  }

  updateCustomer(uid: string, car: Car): Observable<Car> {
    return this.http.put<Car>(`http://localhost:3001/cars/${uid}`, car);
  }

  deleteCustomer(uid: string): Observable<Car> {
    return this.http.delete<Car>(`http://localhost:3001/cars/${uid}`);
  }

}
