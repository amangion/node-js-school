import { composeRouters } from './../utils';
import { UsersRouter } from './users';
import { StubRouter } from './stub';

const composedRouters = composeRouters([
  StubRouter,
  UsersRouter,
]);

export default composedRouters;