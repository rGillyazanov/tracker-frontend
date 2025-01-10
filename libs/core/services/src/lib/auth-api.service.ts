import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@tracker/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private readonly _http: HttpClient) {}

  sanctumCsrfCookie(): Observable<any> {
    return this._http.get(`${environment.API_URL}/sanctum/csrf-cookie`);
  }

  getUser(): Observable<any> {
    return this._http.get(`${environment.API_URL}/api/user`);
  }

  register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Observable<any> {
    return this._http.post(`${environment.API_URL}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this._http.post(`${environment.API_URL}/login`, data);
  }

  forgotPassword(data: { email: string }): Observable<any> {
    return this._http.post(`${environment.API_URL}/forgot-password`, data);
  }

  resetPassword(data: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }): Observable<any> {
    return this._http.post(`${environment.API_URL}/reset-password`, data);
  }

  logout(): Observable<any> {
    return this._http.post(`${environment.API_URL}/logout`, {});
  }
}
