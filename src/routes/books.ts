import * as Router from 'koa-router';
import controller = require('./../controller');

const bookRouter = new Router();

bookRouter.get('/', controller.book.getBooks);
bookRouter.post('/', controller.book.createBook);
bookRouter.get('/:bid', controller.book.getBook);
bookRouter.put('/:bid', controller.book.updateBook);
bookRouter.delete('/:bid', controller.book.deleteBook);

export { bookRouter };