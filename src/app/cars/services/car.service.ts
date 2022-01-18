import { Car } from './../../shared/models/car.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  customer$: Observable<Car>;

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${environment.apiUrl}/cars`);
  }

  getCar(uid: string): Observable<Car> {
    return this.http.get<Car>(`${environment.apiUrl}/${uid}`);
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${environment.apiUrl}/cars`, car);
  }

  updateCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${environment.apiUrl}/cars/${car.id}`, car);
  }

  deleteCar(car: Car): Observable<Car> {
    return this.http.delete<Car>(`${environment.apiUrl}/cars/${car.id}`);
  }
}
