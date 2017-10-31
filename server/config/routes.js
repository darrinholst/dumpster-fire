const {AuthController} = require('src/controllers/auth-controller');
const {VersionController} = require('src/controllers/version-controller');

const GET = 'get';
const POST = 'post';

const ROUTES = [
  {
    method: POST,
    route: '/login',
    handler: (req, res) => new AuthController().login(req, res)
  },
  {
    method: GET,
    route: '/version',
    handler: (req, res) => new VersionController().show(req, res)
  }
];

module.exports.configure = app => {
  ROUTES.forEach(routeConfig => {
    const middleware = routeConfig.middleware || [];

    app[routeConfig.method](
      routeConfig.route,
      ...middleware,
      (req, res, next) => {
        let result = routeConfig.handler(req, res);
        if (result && result.catch) result.catch(next);
      }
    );
  });
};
