exports.up = function(db, callback) {
  db.runSql('CREATE EXTENSION "uuid-ossp"', callback);
};

exports.down = function(db, callback) {
  callback();
};
