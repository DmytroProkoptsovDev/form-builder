import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

interface IAuthResponse {
  user: User
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOCAL_STORAGE_TOKEN_KEY = 'token';
  private BASE_URL = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(user: User) {
    return this.http.post<IAuthResponse>(this.BASE_URL + 'login', user);
  }
  signup(user: User) {
    return this.http.post<IAuthResponse>(this.BASE_URL + 'register', user);
  }
  get token() {
    return window.localStorage.getItem(this.LOCAL_STORAGE_TOKEN_KEY) ?? '';
  }
  get tokenStorageKey() {
    return this.LOCAL_STORAGE_TOKEN_KEY;
  }
  isAuthenticated() {
    const token = this.token;

    return Boolean(token);
  }
  loggout() {
    window.localStorage.removeItem(this.tokenStorageKey);
    this.router.navigate(['']);
  }
}
