let http = require('http');
let app = require('../../server/src/web-server')();

global.E2E_SERVER = http.createServer(app);
global.E2E_SERVER.listen(0);
