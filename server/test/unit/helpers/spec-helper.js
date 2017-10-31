let chai = require('chai');
let dirtyChai = require('dirty-chai');

chai.use(dirtyChai);
chai.config.truncateThreshold = 1000;

process.on('unhandledRejection', e => {
  /* eslint-disable */
  console.log('unhandled rejection', e);
  process.exit(1);
  /* eslint-enable */
});
