import { BaseContext } from 'koa';
import * as HttpStatus from 'http-status-codes';
import { Equal, getManager, Not, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entity/user';
import { Book } from '../entity/book';

export default class BookController {

    public static async getBooks(ctx: BaseContext) {

        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);

        // load all users
        const user: User = await userRepository.findOne({
            where: {id: +ctx.params.id},
            relations: ['books'],
        });

        if (!user) {
            ctx.status = HttpStatus.BAD_REQUEST;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            return;
        }

        // return OK status code and loaded users array
        ctx.status = HttpStatus.OK;
        ctx.body = user.books;
    }

    public static async createBook(ctx: BaseContext) {

        const user = await getManager().findOne(User, +ctx.params.id);

        if (!user) {
            ctx.status = HttpStatus.BAD_REQUEST;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            return;
        }

        // get a user repository to perform operations with user
        const bookRepository: Repository<Book> = getManager().getRepository(Book);

        // build up entity user to be saved
        const bookToBeSaved: Book = new Book();
        bookToBeSaved.name = ctx.request.body.name;
        bookToBeSaved.description = ctx.request.body.description;
        bookToBeSaved.user = user;

        // validate user entity
        const errors: ValidationError[] = await validate(bookToBeSaved); // errors is an array of validation errors

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = HttpStatus.BAD_REQUEST;
            ctx.body = errors;
        } else if (await bookRepository.findOne({name: bookToBeSaved.name})) {
            // return BAD REQUEST status code and book name already exists error
            ctx.status = HttpStatus.BAD_REQUEST;
            ctx.body = 'The specified book name already exists';
        } else {
            // save the user contained in the POST body
            const book = await bookRepository.save(bookToBeSaved);
            // return CREATED status code and updated user
            ctx.status = HttpStatus.CREATED;
            ctx.body = book;
        }
    }

    public static async updateBook(ctx: BaseContext) {

        const user = await getManager().findOne(User, +ctx.params.id);

        if (!user) {
            ctx.status = HttpStatus.BAD_REQUEST;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            return;
        }

        // get a user repository to perform operations with user
        const bookRepository: Repository<Book> = getManager().getRepository(Book);

        // build up entity user to be saved
        const bookToBeSaved: Book = new Book();
        bookToBeSaved.id = +ctx.params.bookId || 0;
        bookToBeSaved.name = ctx.request.body.name;
        bookToBeSaved.description = ctx.request.body.description;
        bookToBeSaved.user = user;

        // validate user entity
        const errors: ValidationError[] = await validate(bookToBeSaved); // errors is an array of validation errors

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = HttpStatus.BAD_REQUEST;
            ctx.body = errors;
        } else if ( !await bookRepository.findOne({id: bookToBeSaved.id, user: user}) ) {
            // check if a book with the specified id not exists
            // return a BAD REQUEST status code and error message
            ctx.status = HttpStatus.BAD_REQUEST;
            ctx.body = 'The book you are trying to update doesn\'t exist in the db';
        } else if (await bookRepository.findOne({id: Not(Equal(bookToBeSaved.id)), name: bookToBeSaved.name})) {
            // return BAD REQUEST status code and book name already exists error
            ctx.status = HttpStatus.BAD_REQUEST;
            ctx.body = 'The specified book name already exists';
        } else {
            // save the user contained in the POST body
            const book = await bookRepository.save(bookToBeSaved);
            // return CREATED status code and updated user
            ctx.status = HttpStatus.CREATED;
            ctx.body = book;
        }
    }

    /** Delete Book from database
     * Make sure that your Authorization header token would contain the proper user id in payload
     * @param ctx
     */
    public static async deleteBook(ctx: BaseContext) {

        const user = await getManager().findOne(User, +ctx.params.id);

        if (!user) {
            ctx.status = HttpStatus.BAD_REQUEST;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            return;
        }

        // get a user repository to perform operations with user
        const bookRepository = getManager().getRepository(Book);

        // find the user by specified id
        const bookToRemove: Book = await bookRepository.findOne({
            where: {id: +ctx.params.bookId || 0, user: user},
            relations: ['user']
        });
        if (!bookToRemove) {
            // return a BAD REQUEST status code and error message
            ctx.status = HttpStatus.BAD_REQUEST;
            ctx.body = 'The book you are trying to delete doesn\'t exist in the db';
        } else if (+ctx.state.user.id !== bookToRemove.user.id) {
            // check user's token id and user id are the same
            // if not, return a FORBIDDEN status code and error message
            console.log(ctx.state.user.id, bookToRemove.user.id);
            ctx.status = HttpStatus.FORBIDDEN;
            ctx.body = 'A book can only be deleted by user that created it';
        } else {
            // the user is there so can be removed
            await bookRepository.remove(bookToRemove);
            // return a NO CONTENT status code
            ctx.status = HttpStatus.NO_CONTENT;
        }
    }
}
