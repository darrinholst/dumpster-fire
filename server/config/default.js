module.exports = {
  logging: {
    expressLogging: 'dev',
    debug: 'oyodf,oyodf:*'
  },
  jwt: {
    browserSecret: 'ENVIRONMENT_VARIABLE',
    expiresIn: '12h'
  },
  db: {
    url: 'ENVIRONMENT_VARIABLE'
  }
};
