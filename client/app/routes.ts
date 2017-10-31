import {Routes} from '@angular/router';

import {AuthGuard} from './auth/auth.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login.component';
import {LogoutComponent} from './auth/logout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
];
