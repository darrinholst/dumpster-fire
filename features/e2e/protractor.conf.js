let path = require('path');

let servers = [];

exports.config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  cucumberOpts: {
    tags: ['~@wip'],
    format: ['json:build/test-results/protractor.json'],
    require: ['support/**/*.js', 'step-definitions/**/*.js'],
    strict: true
  },

  capabilities: {
    browserName: 'chrome',
    specs: '**/*.feature',
    loggingPrefs: {driver: 'WARNING', server: 'OFF', browser: 'ALL'}
  },

  onPrepare: function() {
    browser.driver
      .manage()
      .window()
      .setSize(1024, 768); //eslint-disable-line

    let server = startWebServer();
    servers.push(server);
    browser.baseUrl = `http://localhost:${server.address().port}`;
  },

  onComplete: function() {
    servers.forEach(s => s.close());
  }
};

function startWebServer() {
  require(path.resolve(__dirname, '../../server/dist/e2e-server'));
  return global.E2E_SERVER;
}

