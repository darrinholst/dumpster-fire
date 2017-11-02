let log = require('debug')('df');
let app = require('./src/web-server')();

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
  log(`server is serving on port ${app.get('port')}`);
});
