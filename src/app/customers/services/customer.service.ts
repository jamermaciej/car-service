import { HttpClient } from '@angular/common/http';
import { Customer } from './../../shared/models/customer.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customer$: Observable<Customer>;

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiUrl}/customers`);
  }

  getCustomer(uid: string): Observable<Customer> {
    return this.http.get<Customer>(`${environment.apiUrl}/customers/${uid}`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      `${environment.apiUrl}/customers`,
      customer
    );
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(
      `${environment.apiUrl}/customers/${customer.id}`,
      customer
    );
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(
      `${environment.apiUrl}/customers/${id}`
    );
  }
}
