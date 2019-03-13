import { composeRouters } from './../utils';
import { StubRouter } from './stub';
import { UsersRouter } from './users';
import { BooksRouter } from './books';

const composedRouters = composeRouters([
  StubRouter,
  UsersRouter,
  BooksRouter
]);

export default composedRouters;