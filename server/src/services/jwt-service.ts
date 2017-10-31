import * as jwt from 'jsonwebtoken';
import * as config from 'config';
const jwtConfig = config.get('jwt');

export class JwtService {
  generate(user) {
    return jwt.sign(user, jwtConfig.browserSecret, {
      expiresIn: jwtConfig.expiresIn
    });
  }
}
