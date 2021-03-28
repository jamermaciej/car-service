import { Status } from './../../shared/models/status.model';
import { Car } from './../../shared/models/car.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>('http://localhost:3001/statuses');
  }

//   getCar(uid: string): Observable<Car> {
//     return this.http.get<Car>(`http://localhost:3001/cars/${uid}`);
//   }

  addStatus(status: Status): Observable<Status> {
    return this.http.post<Status>('http://localhost:3001/statuses', status);
  }

//   updateCar(uid: string, car: Car): Observable<Car> {
//     return this.http.put<Car>(`http://localhost:3001/cars/${uid}`, car);
//   }

  deleteStatus(id: number): Observable<Status> {
    return this.http.delete<Status>(`http://localhost:3001/statuses/${id}`);
  }

}
