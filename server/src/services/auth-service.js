const {JwtService} = require('./jwt-service');

module.exports.authService = {
  login
};

function login(username, password) {
  return new Promise((resolve, reject) => {
    if (!password || password.toLowerCase().includes('password')) {
      reject();
    } else {
      resolve(new JwtService().generate({username}));
    }
  });
}
