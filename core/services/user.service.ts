
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { tap } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}`;
  private userSignal = signal<User | null>(null);
  user = this.userSignal.asReadonly();


  signup(data: User) {
    return this.http.post(`${this.baseUrl}/auth/signup`, data);
  }

  login(data: LoginUser) {
    return this.http.post(`${this.baseUrl}/auth/token`, data).pipe(
      tap((response: any) => {
        this.userSignal.set(response.user);
      })
    );
  }

  updateUserProfile(data: User) {
    return this.http.put(`${this.baseUrl}/user/me`, data);
  }


  refreshToken() {
    return this.http.post(`${this.baseUrl}/auth/refresh`, {}, { withCredentials: true });
  }
}