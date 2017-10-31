let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let dirtyChai = require('dirty-chai');

chai.use(chaiAsPromised);
chai.use(dirtyChai);
chai.config.truncateThreshold = 1000;

global.expect = chai.expect;

process.on('unhandledRejection', e => {
  /* eslint-disable */
  console.log('unhandled rejection', e);
  process.exit(1);
  /* eslint-enable */
});
