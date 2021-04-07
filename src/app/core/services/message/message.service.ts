import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from 'src/app/shared/models/status.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(status: Status) {
    return this.http.post(`${environment.apiUrl}/messages/status`, status);
  }
}
