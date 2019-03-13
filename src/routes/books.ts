import * as Router from 'koa-router';
import controller = require('./../controller');

const bookRouter = new Router();

bookRouter.get('/', controller.book.getBooks);
bookRouter.post('/', controller.book.createBook);
bookRouter.get('/:id', controller.book.getBook);
bookRouter.put('/:id', controller.book.updateBook);
bookRouter.delete('/:id', controller.book.deleteBook);

export { bookRouter };