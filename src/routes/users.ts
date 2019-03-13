import * as Router from 'koa-router';
import { UsersController } from './../controllers';

const UsersRouter = new Router({
  prefix: '/users',
});

UsersRouter.get('/', UsersController.getUsers);
UsersRouter.get('/:id', UsersController.getUser);
UsersRouter.post('/', UsersController.createUser);
UsersRouter.put('/:id', UsersController.updateUser);
UsersRouter.delete('/:id', UsersController.deleteUser);

export { UsersRouter };