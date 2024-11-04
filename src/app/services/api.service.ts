// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiGatewayUrl;

  constructor(private http: HttpClient) { }

  // Example GET request method
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get`);
  }
}
