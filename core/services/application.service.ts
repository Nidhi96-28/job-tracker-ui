import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  createApplication(payload: any) {
    return this.http.post(`${this.baseUrl}/applications`, payload, { withCredentials: true });
  }

 getCompanies() {
  return this.http.get<{ id: number; name: string }[]>(`${this.baseUrl}/companies/`, { withCredentials: true });
}

  getApplications() {
    return this.http.get<any[]>(`${this.baseUrl}/applications`, { withCredentials: true });
  }

  getApplication(id: number) {
  return this.http.get<any>(`${this.baseUrl}/applications/${id}`, { withCredentials: true });
}

updateApplication(id: number, payload: any) {
  return this.http.put(`${this.baseUrl}/applications/${id}`, payload, { withCredentials: true });
}

createCompany(name: string) {
  return this.http.post<{ id: number; name: string }>(`${this.baseUrl}/companies`, { name }, { withCredentials: true });
}

deleteApplication(id: number) {
  return this.http.delete(`${this.baseUrl}/applications/${id}`, { withCredentials: true });
}
}