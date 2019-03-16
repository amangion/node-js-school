import * as Router from 'koa-router';
import controller = require('./controller');

const router = new Router();

// GENERAL ROUTES
router.get('/',             		controller.general.helloWorld);
router.get('/jwt',          		controller.general.getJwtPayload);

// USER ROUTES
router.get(     '/users',           		controller.user.getUsers);
router.get(     '/users/:id',       		controller.user.getUser);
router.post(    '/users',     				controller.user.createUser);
router.put(     '/users/:id',         		controller.user.updateUser);
router.delete(  '/users/:id/books',			controller.user.deleteUser);

router.get(		'/users/:id/books',   		controller.book.getUserBooks);
router.post(	'/users/:id/books',   		controller.book.createUserBook);
router.put(		'/users/:id/books/:book_id',controller.book.updateBook);
router.delete(	'/users/:id/books/:book_id',controller.book.deleteBook);

router.post(    '/seed',           		controller.user.seedData);

export { router };