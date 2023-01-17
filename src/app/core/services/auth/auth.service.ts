import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterData } from 'src/app/shared/models/register-data.model';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(registerData: RegisterData): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, registerData);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password });
  }

  verifyEmail(userId: string, code: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/auth/verify/${userId}/${code}`);
  }

  sendVerifiyEmail(email: string) {
    return this.http.post(`${environment.apiUrl}/auth/send-verify-email`, { email });
  }

  changeEmail(password: string, email: string) {
    return this.http.post(`${environment.apiUrl}/auth/change-email`, { password, email });
  }

  changePassword(password: string, newPassword: string) {
    return this.http.post(`${environment.apiUrl}/auth/change-password`, { password, newPassword });
  }

}
