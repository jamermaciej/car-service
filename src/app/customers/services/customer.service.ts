import { HttpClient } from '@angular/common/http';
import { Customer } from './../../shared/models/customer.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customer$: Observable<Customer>;

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('http://localhost:3001/customers');
  }

  getCustomer(uid: string): Observable<Customer> {
    return this.http.get<Customer>(`http://localhost:3001/customers/${uid}`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>('http://localhost:3001/customers', customer);
  }

  updateCustomer(uid: string, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`http://localhost:3001/customers/${uid}`, customer);
  }

  deleteCustomer(uid: string): Observable<Customer> {
    return this.http.delete<Customer>(`http://localhost:3001/customers/${uid}`);
  }

}
