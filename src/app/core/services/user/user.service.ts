import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import GlobalFunctions from 'src/app/_helpers/GlobalFunctions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getMe(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/me`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  updateUser(user: User): Observable<User> {
    const formData: FormData = GlobalFunctions.convertToFormData(user);

    return this.http.put<User>(`${environment.apiUrl}/users/${user._id}`, formData);
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${environment.apiUrl}/users/${userId}`);
  }

}
