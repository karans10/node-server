'use strict';

import * as express from 'express';
import { Logger } from '../utils/logger';

let userRouter: express.Router = express.Router();
//let user = new User();

userRouter.get('/:user_id', (request: express.Request, response: express.Response) => {
   console.log('in route');
});
export  = userRouter;