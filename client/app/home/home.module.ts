import {NgModule} from '@angular/core';

import {CoreModule} from '../core/core.module';
import {HomeComponent} from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CoreModule]
})
export class HomeModule {}
