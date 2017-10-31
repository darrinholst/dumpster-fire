import {NgModule} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {EffectsModule} from '@ngrx/effects';

import {CoreModule} from '../core/core.module';

import {LoginComponent} from './login.component';
import {LogoutComponent} from './logout.component';
import {AuthService} from './auth.service';
import {AuthActions} from './auth.actions';
import {AuthGuard} from './auth.guard';
import {AuthEffects} from './auth.effects';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  exports: [LoginComponent, LogoutComponent],
  imports: [CoreModule, EffectsModule.forFeature([AuthEffects])],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthService,
    AuthActions,
    AuthGuard
  ]
})
export class AuthModule {}
