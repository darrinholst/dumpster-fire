import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomeComponent {
  user$: Observable<any>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.user$ = this.store.select('user');
  }
}
