import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {AuthService} from './auth.service';
import {AuthActions} from './auth.actions';
import {NotificationService} from '../core/notification.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private authActions: AuthActions
  ) {}

  @Effect()
  login$ = this.actions$
    .ofType(AuthActions.LOGIN)
    .switchMap((action: any) => this.login(action.payload));

  private login(payload: any) {
    return this.authService
      .login(payload.username, payload.password)
      .map((user: any) => this.authActions.loginSuccess(user))
      .catch((response: any) => of(this.authActions.loginFailure(response)));
  }
}
