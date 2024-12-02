import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { fetchAuthSession, AuthTokens } from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiGatewayUrl;

  constructor(private http: HttpClient) { }

  // GET Data Method with Authorization Header
  async getData(): Promise<Observable<any>> {
    try {
      // Fetch current auth session to get tokens
      const authSession = await fetchAuthSession();

      // Check if authSession and tokens are available
      if (!authSession || !authSession.tokens || !authSession.tokens.idToken) {
        throw new Error('Authentication token is unavailable.');
      }

      const jwtToken = authSession.tokens.idToken;

      // Set the Authorization header with the token
      const headers = new HttpHeaders({
        Authorization: jwtToken.toString(),
      });

      // Make the HTTP GET request with headers
      return this.http.get<any>(`${this.apiUrl}/get`, { headers });
    } catch (error) {
      console.error('Error fetching tokens or making request:', error);
      throw new Error('Failed to authorize request. Please ensure you are logged in.');
    }
  }

  // Update Inventory Method with Authorization Header
  async updateInventory(data: any): Promise<Observable<any>> {
    try {
      // Fetch current auth session to get tokens
      const authSession = await fetchAuthSession();

      // Check if authSession and tokens are available
      if (!authSession || !authSession.tokens || !authSession.tokens.idToken) {
        throw new Error('Authentication token is unavailable.');
      }

      const jwtToken = authSession.tokens.idToken;

      // Set the Authorization header with the token
      const headers = new HttpHeaders({
        Authorization: jwtToken.toString(),
      });

      // Make the HTTP POST request with headers
      return this.http.post<any>(`${this.apiUrl}/updateInventoryLambda`, data, { headers });
    } catch (error) {
      console.error('Error fetching tokens or making request:', error);
      throw new Error('Failed to authorize request. Please ensure you are logged in.');
    }
  }
}
