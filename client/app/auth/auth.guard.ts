import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/take';

import {AuthService} from './auth.service';
import {AuthActions} from './auth.actions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<any>,
    private authService: AuthService,
    private authActions: AuthActions
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.getUser()
      .then(() => true)
      .catch(() => false);
  }

  private getUser() {
    return new Promise((resolve, reject) => {
      this.store
        .select('user')
        .take(1)
        .subscribe(user => {
          if (user) return resolve(user);
          user = this.getUserFromToken();
          return user ? resolve(user) : reject();
        });
    });
  }

  private getUserFromToken() {
    let user = this.authService.getUser();

    if (user) {
      this.authActions.authenticated(user);
    } else {
      this.authActions.notAuthenticated();
    }

    return user;
  }
}
