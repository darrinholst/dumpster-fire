const {defineSupportCode} = require('cucumber');

defineSupportCode(({Then}) => {
  Then('I should see {string}', function(string) {
    const home = element(by.css('home'));
    return expect(home.getText()).to.eventually.match(new RegExp(string));
  });
});
