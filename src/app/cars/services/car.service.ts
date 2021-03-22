import { Car } from './../../shared/models/car.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  customer$: Observable<Car>;

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>('http://localhost:3001/cars');
  }

  getCar(uid: string): Observable<Car> {
    return this.http.get<Car>(`http://localhost:3001/cars/${uid}`);
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>('http://localhost:3001/cars', car);
  }

  updateCar(uid: string, car: Car): Observable<Car> {
    return this.http.put<Car>(`http://localhost:3001/cars/${uid}`, car);
  }

  deleteCar(uid: string): Observable<Car> {
    return this.http.delete<Car>(`http://localhost:3001/cars/${uid}`);
  }

}
