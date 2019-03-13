import * as Router from 'koa-router';
import controller = require('../controller');
import { userRouter } from './users';

const router = new Router();

// GENERAL ROUTES
router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);
router.use('/users', userRouter.routes(), userRouter.allowedMethods());

export { router };
