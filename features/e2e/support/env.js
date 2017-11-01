const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const dirtyChai = require('dirty-chai');
const {defineSupportCode} = require('cucumber');

chai.use(chaiAsPromised);
chai.use(dirtyChai);
chai.config.truncateThreshold = 1000;
global.expect = chai.expect;

defineSupportCode(function({setDefaultTimeout}) {
  setDefaultTimeout(300 * 1000);
});
