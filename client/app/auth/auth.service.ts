import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  login(username: string, password: string) {
    return this.http.post('/login', {username, password}).map(response => {
      const token = response.json().token;
      localStorage.setItem('token', token);
      return this.getUser();
    });
  }

  logout() {
    localStorage.removeItem('token');
  }

  getUser() {
    let token = localStorage.getItem('token');
    if (token && tokenNotExpired()) return new JwtHelper().decodeToken(token);
  }
}
