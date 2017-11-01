module.exports = {
  logging: {
    expressLogging: 'dev',
    debug: 'df,df:*'
  },
  jwt: {
    browserSecret: 'ENVIRONMENT_VARIABLE',
    expiresIn: '12h'
  },
  db: {
    url: 'ENVIRONMENT_VARIABLE'
  }
};
