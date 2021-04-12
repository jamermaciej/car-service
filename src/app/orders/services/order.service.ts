import { Order } from './../../shared/models/order.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}/orders`);
  }

//   getCar(uid: string): Observable<Car> {
//     return this.http.get<Car>(`${environment.apiUrl}/${uid}`);
//   }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.apiUrl}/orders`, order);
  }

//   updateCar(uid: string, car: Car): Observable<Car> {
//     return this.http.put<Car>(`${environment.apiUrl}/cars/${uid}`, car);
//   }

//   deleteCar(uid: string): Observable<Car> {
//     return this.http.delete<Car>(`${environment.apiUrl}/cars/${uid}`);
//   }

}
