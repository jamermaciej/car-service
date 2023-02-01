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
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password }, { withCredentials: true });
  }

  refreshToken(): Observable<{ accessToken: string }> {
    return this.http.get<{ accessToken: string }>(`${environment.apiUrl}/auth/refresh-token`, { withCredentials: true });
  }

  logout(): Observable<null> {
    return this.http.get<null>(`${environment.apiUrl}/auth/logout`, { withCredentials: true });
  }

  verifyEmail(userId: string, code: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/auth/verify/${userId}/${code}`);
  }

  sendVerifiyEmail(email: string) {
    return this.http.post(`${environment.apiUrl}/auth/send-verify-email`, { email });
  }

  forgotPassword(email: string) {
    return this.http.post(`${environment.apiUrl}/auth/forgot-password`, { email });
  }

 resetPassword(token: string, password: string, passwordConfirm: string) {
    return this.http.post(`${environment.apiUrl}/auth/reset-password/${token}`, { password, passwordConfirm });
  }

  changeEmail(password: string, email: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/change-email`, { password, email });
  }

  changePassword(password: string, newPassword: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/change-password`, { password, newPassword });
  }

  deleteAccount(password: string) {
    return this.http.delete(`${environment.apiUrl}/auth/delete-account`, {
      body: {
        password
      }
    });
  }

}
