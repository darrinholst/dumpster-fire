import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {ValidatorsModule} from 'ngx-validators';

import {MaterialModule} from './material.module';
import {AppHeaderComponent} from './app-header.component';
import {LoadingComponent} from './loading.component';
import {NotificationService} from './notification.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ValidatorsModule,
    MaterialModule
  ],
  declarations: [AppHeaderComponent, LoadingComponent],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ValidatorsModule,
    MaterialModule,

    AppHeaderComponent,
    LoadingComponent
  ],
  providers: [NotificationService]
})
export class CoreModule {}
