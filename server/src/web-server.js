const bodyParser = require('body-parser');
const compression = require('compression');
const debug = require('debug');
const express = require('express');
const expressJwt = require('express-jwt');
const morgan = require('morgan');
const config = require('config');
const loggingConfig = config.get('logging');
debug.enable(`${process.env.DEBUG},${loggingConfig.debug}`);
const log = debug('df');

const routes = require('./routes');

module.exports = function start() {
  let app = express();
  configureApp(app);
  configureRoutes(app);
  return app;
};

function configureApp(app) {
  app.set('view engine', 'hbs');
  app.set('views', 'server/src/views');
  app.use(compression());

  if (loggingConfig.expressLogging) {
    app.use(morgan(loggingConfig.expressLogging));
  }

  app.use(bodyParser.json({type: ['application/json']}));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static('server/public'));
}

function configureRoutes(app) {
  app.use('/api', expressJwt({secret: config.get('jwt.browserSecret')}));
  app.use('/api', noCache);
  routes.configure(app);
  app.use('/api', (req, res) => res.status(404).end());
  app.use(unknownRouteHandler);
  app.use(errorHandler);
}

// rendering index here allows a browser refresh to work when on a client side route
function unknownRouteHandler(req, res) {
  res.render('index', {token: req.query.token});
}

// expresses error handler is determined by the number of arguments ¯\_(ツ)_/¯
// eslint-disable-next-line
function errorHandler(error, req, res, next) {
  logError(error);
  res.statusCode = error.status || 500;
  if (error.friendlyMessage) res.statusMessage = error.friendlyMessage;
  res.end();
}

function logError(error) {
  if (isNotFound(error) || isExpiredToken(error)) return;
  log('Uncaught error: %j, stack: %s', error, error.stack);
}

function isNotFound(error) {
  return error.status === 404;
}

function isExpiredToken(error) {
  return (
    error.status === 401 &&
    error.message &&
    error.message.match(/jwt expired|no authorization token/i)
  );
}

function noCache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}
