import * as Router from 'koa-router';
import controller = require('./../controller');
import { bookRouter } from './books';

const userRouter = new Router();

userRouter.get('/', controller.user.getUsers);
userRouter.post('/', controller.user.createUser);

userRouter.get('/:id', controller.user.getUser);
userRouter.put('/:id', controller.user.updateUser);
userRouter.delete('/:id', controller.user.deleteUser);

userRouter.use('/:id/books', bookRouter.routes(), bookRouter.allowedMethods());

export { userRouter };