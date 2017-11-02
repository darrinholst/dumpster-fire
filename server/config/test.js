module.exports = {
  logging: {
    expressLogging: false,
    debug: ''
  },

  jwt: {
    browserSecret: 'secret',
    expiresIn: '12h'
  },

  db: {
    url: process.env.CI
      ? 'postgres://admin:password@172.17.0.1:5474/heroku-nodejs-build-demo-test'
      : 'postgres://admin:password@localhost:5473/heroku-nodejs-build-demo-test'
  }
};
