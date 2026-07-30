// core/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/auth`;

  signup(data: User) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  login(data: LoginUser) {
    return this.http.post(`${this.baseUrl}/token`, data);
  }
}