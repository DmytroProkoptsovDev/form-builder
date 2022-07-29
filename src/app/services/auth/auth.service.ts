import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOCAL_STORAGE_TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post<User>('fake-api.com', user);
  }
  signup(user: User) {
    return this.http.post<User>('fake-api.com', user);
  }
  getToken() {
    return window.localStorage.getItem(this.LOCAL_STORAGE_TOKEN_KEY) ?? '';
  }
}
