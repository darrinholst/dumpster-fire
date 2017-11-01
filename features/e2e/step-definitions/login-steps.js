const _ = require('lodash');
const jwt = require('jsonwebtoken');
const {defineSupportCode} = require('cucumber');

defineSupportCode(({Given, When}) => {
  const PAGES = [{match: /^home/, action: navigateToHome, isActive: hasLogo}];

  let currentUser;
  let forceReload = true;

  Given(/^I am logged in(?: as "([^"]*)")?$/, async function(username) {
    username = username || 'testuser';
    const user = await getUserFor(username);
    forceReload = user !== currentUser;
    currentUser = user;
  });

  When(/^I go(?: back)? to the (.*) page$/, function(page) {
    return shouldReloadApplication(page).then(function(isReloadNeeded) {
      if (isReloadNeeded) loadRootPage();
      return navigateToPage(page);
    });
  });

  When(/^I navigate to "([^"]*)"/, function(url) {
    return loadUrl(url);
  });

  function shouldReloadApplication(page) {
    if (forceReload) {
      return protractor.promise.controlFlow().execute(() => true);
    } else {
      return findPageConfigFor(page)
        .isActive()
        .then(value => !value);
    }
  }

  function loadRootPage() {
    forceReload = false;
    return loadUrl(`/?token=${generateToken(currentUser)}`);
  }

  function navigateToPage(page) {
    return findPageConfigFor(page).action();
  }

  function findPageConfigFor(page) {
    let matchData;

    let config = _.find(PAGES, function(url) {
      matchData = page.match(url.match);
      return matchData;
    });

    if (config) {
      return _.extend(_.clone(config), {match: matchData});
    } else {
      throw new Error("Couldn't figure out how to get to page - " + page);
    }
  }

  function clickTheLogo() {
    return element(by.css('.logo')).click();
  }

  function navigateToHome() {
    return clickTheLogo();
  }

  function loadUrl(url) {
    browser.get(url);
  }

  function hasLogo() {
    return element(by.css('.logo')).isPresent();
  }

  async function getUserFor(username) {
    return {username};
  }

  function generateToken(user) {
    user.username = user.username || user.email;

    return jwt.sign(user, 'secret');
  }
});
