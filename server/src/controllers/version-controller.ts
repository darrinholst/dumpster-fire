import {Response} from 'express';

import * as versionConfig from '../../config/version';

export class VersionController {
  show(_, res: Response) {
    res.json(versionConfig);
  }
}
