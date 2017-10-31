/*
 * order of all this stuff seems to be important
 */
const jsdom = require('jsdom');
const document = jsdom.jsdom('<!doctype html><html><body></body></html>');
const window = document.defaultView;

global.HTMLElement = window.HTMLElement;
global.XMLHttpRequest = window.XMLHttpRequest;
global.document = document;
global.navigator = window.navigator;

require('core-js/es6');
require('core-js/es7/reflect');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

const testing = require('@angular/core/testing');
const browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(
  browser.BrowserDynamicTestingModule,
  browser.platformBrowserDynamicTesting()
);

global.window = window;
global.CSS = null;

require('hammerjs');
