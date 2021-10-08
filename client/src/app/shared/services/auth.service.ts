import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  register() {}

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('api/auth/login', user).pipe(
      tap(({ token }) => {
        localStorage.setItem('auth-token', token);
        this.setToken(token);
      })
    );
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToket(): string | null {
    return this.token;
  }

  isAuthenticates(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear;
  }
}