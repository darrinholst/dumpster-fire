import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

import {AuthActions} from './auth.actions';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {
  failure = false;
  submitted = false;
  username: string;
  password: string;

  private loginSub: Subscription;

  constructor(
    private store: Store<any>,
    private router: Router,
    private actions: AuthActions
  ) {}

  ngOnInit() {
    this.loginSub = this.store
      .select('login')
      .subscribe(this.loginResult.bind(this));
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

  onSubmit() {
    this.failure = false;
    this.submitted = true;
    this.actions.login(this.username, this.password);
  }

  private loginResult(result: any) {
    if (result.failure) {
      this.failure = true;
      this.submitted = false;
    } else {
      this.router.navigateByUrl('/', {replaceUrl: true});
    }
  }
}
