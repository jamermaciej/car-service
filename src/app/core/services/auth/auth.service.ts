import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterData } from 'src/app/shared/models/register-data.model';
import { User } from 'src/app/shared/models/user.model';
import GlobalFunctions from 'src/app/_helpers/GlobalFunctions';
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

  updateUser(user: User): Observable<User> {
    const formData: FormData = GlobalFunctions.convertToFormData(user);

    return this.http.put<User>(`${environment.apiUrl}/auth/users/${user._id}`, formData);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${environment.apiUrl}/users/${userId}`);
  }
}
