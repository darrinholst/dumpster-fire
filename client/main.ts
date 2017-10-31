import 'reflect-metadata';
import 'zone.js';
import 'hammerjs';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';

import {AppModule} from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
