import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): any {
    const loginValue = {
      username: username,
      password: password
    }
    return this.http.post('https://dummyjson.com/auth/login',loginValue);
  }

  signup(username: string, password: string): any {
    const loginValue = {
      username: username,
      password: password
    }
    return this.http.post('https://dummyjson.com/auth/login',loginValue);
  }
}
