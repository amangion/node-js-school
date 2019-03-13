import * as Router from 'koa-router';
import { StubController } from './../controllers';

const StubRouter = new Router();

StubRouter.get('/', StubController.helloWorld);
StubRouter.get('/jwt', StubController.getJwtPayload);

export { StubRouter };