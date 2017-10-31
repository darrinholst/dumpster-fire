import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {AuthService} from './auth.service';

@Injectable()
export class AuthActions {
  static readonly LOGIN = 'LOGIN';
  static readonly LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  static readonly LOGIN_FAILURE = 'LOGIN_FAILURE';
  static readonly AUTHENTICATED = 'AUTHENTICATED';
  static readonly NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';

  constructor(
    private service: AuthService,
    private store: Store<any>,
    private router: Router
  ) {}

  notAuthenticated() {
    this.router.navigateByUrl('/login');
    return this.store.dispatch({type: AuthActions.NOT_AUTHENTICATED});
  }

  authenticated(user: any) {
    return this.store.dispatch({
      type: AuthActions.AUTHENTICATED,
      payload: user
    });
  }

  logout() {
    this.service.logout();
    return this.notAuthenticated();
  }

  login(username: string, password: string) {
    this.store.dispatch({
      type: AuthActions.LOGIN,
      payload: {username, password}
    });
  }

  loginSuccess(token: string) {
    return {type: AuthActions.LOGIN_SUCCESS, payload: token};
  }

  loginFailure(response: any) {
    return {type: AuthActions.LOGIN_FAILURE, payload: response};
  }
}
