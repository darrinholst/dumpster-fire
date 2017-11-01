import {TestBed, ComponentFixture} from '@angular/core/testing';
import {StoreModule, Store} from '@ngrx/store';
import {By} from '@angular/platform-browser';
import {expect} from 'chai';

import {MaterialModule} from 'core/material.module';
import {AppHeaderComponent} from 'core/app-header.component';
import {authReducers} from 'auth/auth.reducers';
import {AuthActions} from 'auth/auth.actions';

describe('app-header', () => {
  let fixture: ComponentFixture<AppHeaderComponent>;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, StoreModule.forRoot(authReducers)],
      declarations: [AppHeaderComponent]
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(AppHeaderComponent);
  });

  it('should not show a menu button if not logged in', () => {
    store.dispatch({type: AuthActions.NOT_AUTHENTICATED});
    const button = findToolbarMenuButton();
    expect(button).to.have.length(0);
  });

  it('should show a menu button if logged in', () => {
    store.dispatch({
      type: AuthActions.AUTHENTICATED,
      payload: {id: 'anything'}
    });
    const button = findToolbarMenuButton();
    expect(button).to.have.length(1);
  });

  function findToolbarMenuButton() {
    fixture.detectChanges();
    return fixture.debugElement.queryAll(By.css('mat-toolbar button'));
  }
});
