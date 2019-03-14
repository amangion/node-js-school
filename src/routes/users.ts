import * as Router from 'koa-router';
import controller = require('./../controller');
import { bookRouter } from './books';

const userRouter = new Router();

userRouter.get('/', controller.user.getUsers);
userRouter.post('/', controller.user.createUser);

userRouter.get('/:uid', controller.user.getUser);
userRouter.put('/:uid', controller.user.updateUser);
userRouter.delete('/:uid', controller.user.deleteUser);

userRouter.use('/:uid/books', bookRouter.routes(), bookRouter.allowedMethods());

export { userRouter };