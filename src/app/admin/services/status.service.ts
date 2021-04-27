import { environment } from 'src/environments/environment';
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
    return this.http.get<Status[]>(`${environment.apiUrl}/statuses`);
  }

//   getCar(uid: string): Observable<Car> {
//     return this.http.get<Car>(`http://localhost:3001/cars/${uid}`);
//   }

  addStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(`${environment.apiUrl}/statuses`, status);
  }

  updateStatus(status: Status): Observable<Status> {
    return this.http.put<Status>(`${environment.apiUrl}/statuses/${status.id}`, status);
  }

  deleteStatus(id: number): Observable<Status> {
    return this.http.delete<Status>(`${environment.apiUrl}/statuses/${id}`);
  }

}
