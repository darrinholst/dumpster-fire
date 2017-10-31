let config = require('config');
let dbConfig = config.get('db');
let debug = require('debug')('oyodf:sql');

let pgp = require('pg-promise')({
  query: event => debug(event.query.replace(/\n/g, ' ').replace(/ {2,}/g, ' ')),
  pgNative: true
});

module.exports = pgp(dbConfig.url);
