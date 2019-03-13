import * as Router from 'koa-router';
import { BooksController } from './../controllers';

const BooksRouter = new Router({
  prefix: '/users/:user_id/books',
});

BooksRouter.get('/', BooksController.getBooks);
BooksRouter.post('/', BooksController.createBook);
BooksRouter.put('/:id', BooksController.updateBook);
BooksRouter.delete('/:id', BooksController.deleteBook);

export { BooksRouter };