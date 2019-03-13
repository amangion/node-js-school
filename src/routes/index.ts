import { composeRouters } from './../utils';
import { StubRouter } from './stub';
import { UsersRouter } from './users';
import { BooksRouter } from './books';

const composedRouters = composeRouters([
  UsersRouter,
  StubRouter,
  BooksRouter,
]);

export default composedRouters;