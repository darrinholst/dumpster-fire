import {expect} from 'chai';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
const jwtConfig = config.get('jwt');

import {JwtService} from 'src/services/jwt-service';

describe('TickerService', () => {
  let service: JwtService;

  beforeEach(() => {
    service = new JwtService();
  });

  describe('generate', () => {
    it('generates a valid token', async function() {
      const token = service.generate({id: 'anything'});
      const decoded = jwt.verify(token, jwtConfig.browserSecret);
      expect(decoded.id).to.eql('anything');
    });
  });
});
