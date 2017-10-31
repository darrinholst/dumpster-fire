import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {
  private user: any;
  private userSub: Subscription;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    const user$ = this.store.select('user');
    this.userSub = user$.subscribe(user => (this.user = user));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  isLoggedIn() {
    return !!this.user;
  }
}
