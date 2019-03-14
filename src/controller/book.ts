import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { Book } from '../entity/book';
import { User } from '../entity/user';
import status = require('http-status');

export default class BookController {

    private static async checkForUserExist(ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);
        const user: User = await userRepository.findOne(+ctx.params.uid || 0);

        if (!user) {
            ctx.status = status.NOT_FOUND;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            return false;
        }

        return true;
    }

    private static checkUserPermission(ctx: BaseContext) {
        if (ctx.state.user.id === ctx.params.uid)
            return true;
        else {
            ctx.status = status.FORBIDDEN;
            ctx.body = 'You have no access to this action';
            return false;
        }
    }

    public static async getBooks(ctx: BaseContext) {
        const userExists = await BookController.checkForUserExist(ctx);

        if (!userExists) {
            return;
        }

        const bookRepository: Repository<Book> = getManager().getRepository(Book);

        const books: Book[] = await bookRepository.find();

        ctx.status = status.OK;
        ctx.body = books;
    }

    public static async getBook(ctx: BaseContext) {
        const userExists = await BookController.checkForUserExist(ctx);

        if (!userExists) {
            return;
        }

        const bookRepository: Repository<Book> = getManager().getRepository(Book);

        const book: Book = await bookRepository.findOne(+ctx.params.bid || 0);

        if (!book) {
            ctx.status = status.NOT_FOUND;
            ctx.body = 'The book you are trying to retrieve doesn\'t exist in the db';
            return;
        }

        ctx.status = status.OK;
        ctx.body = book;
    }

    public static async createBook(ctx: BaseContext) {
        // if (!BookController.checkUserPermission(ctx)) {
        //     return;
        // }

        const userExists = await BookController.checkForUserExist(ctx);

        if (!userExists) {
            return;
        }

        const bookRepository: Repository<Book> = getManager().getRepository(Book);

        const bookToBeSaved: Book = new Book();
        bookToBeSaved.name = ctx.request.body.name;
        bookToBeSaved.description = ctx.request.body.description;
        bookToBeSaved.date = Date.now().toString();

        const user: User = await getManager().getRepository(User).findOne(+ctx.params.uid);

        bookToBeSaved.user = user;

        const errors: ValidationError[] = await validate(bookToBeSaved); // errors is an array of validation errors

        if (errors.length > 0) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = errors;
            return;
        }

        const book = await bookRepository.save(bookToBeSaved);
        ctx.status = status.CREATED;
        ctx.body = book;
    }

    public static async updateBook(ctx: BaseContext) {
        // if (!BookController.checkUserPermission(ctx)) {
        //     return;
        // }

        const userExists = await BookController.checkForUserExist(ctx);

        if (!userExists) {
            return;
        }

        const bookRepository: Repository<Book> = getManager().getRepository(Book);

        const bookToBeUpdated: Book = new Book();

        bookToBeUpdated.id = +ctx.params.bid || 0;
        bookToBeUpdated.name = ctx.request.body.name;
        bookToBeUpdated.description = ctx.request.body.description;
        bookToBeUpdated.date = Date.now().toString();

        const errors: ValidationError[] = await validate(bookToBeUpdated);

        if (errors.length > 0) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = errors;
            return;
        }

        if (!await bookRepository.findOne(bookToBeUpdated.id)) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = 'The book you are trying to update doesn\'t exist in the db';
            return;
        }

        const book = await bookRepository.save(bookToBeUpdated);
        ctx.status = status.CREATED;
        ctx.body = book;
    }

    public static async deleteBook(ctx: BaseContext) {
        // if (!BookController.checkUserPermission(ctx)) {
        //     return;
        // }

        const userExists = await BookController.checkForUserExist(ctx);

        if (!userExists) {
            return;
        }

        const bookRepository = getManager().getRepository(Book);

        const bookToRemove: Book = await bookRepository.findOne(+ctx.params.bid || 0);

        if (!bookToRemove) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = 'The book you are trying to delete doesn\'t exist in the db';
            return;
        }

        await bookRepository.remove(bookToRemove);
        ctx.status = status.NO_CONTENT;
    }
}
