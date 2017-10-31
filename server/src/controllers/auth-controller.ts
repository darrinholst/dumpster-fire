import {Request, Response} from 'express';
import {authService} from '../services/auth-service';

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const token = await authService.login(
        req.body.username,
        req.body.password
      );
      res.json({token});
    } catch (e) {
      res.status(401).end();
    }
  }
}
