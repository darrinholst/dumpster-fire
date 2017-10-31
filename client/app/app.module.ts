import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {storeLogger} from 'ngrx-store-logger';
import {storeFreeze} from 'ngrx-store-freeze';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {routes} from './routes';
import {AppRootComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {HomeModule} from './home/home.module';

import {authReducers} from './auth/auth.reducers';
const reducers = Object.assign({}, authReducers);
const metaReducers = [];
const isDev = process.env.NODE_ENV === 'development';
const loggingOptions = {
  collapsed: true
};

if (isDev) metaReducers.push(storeLogger(loggingOptions), storeFreeze);

@NgModule({
  declarations: [AppRootComponent],
  imports: [
    CoreModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers, {metaReducers}),
    isDev ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    AuthModule,
    HomeModule
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule {}
