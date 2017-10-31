import {Component} from '@angular/core';

import {AuthActions} from './auth.actions';

@Component({
  selector: 'logout',
  template: ''
})
export class LogoutComponent {
  constructor(private actions: AuthActions) {}

  ngOnInit() {
    this.actions.logout();
  }
}
