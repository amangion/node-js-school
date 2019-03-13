import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { Book } from '../entity/book';
import status = require('http-status');

export default class BookController {

    public static async getBooks(ctx: BaseContext) {

        const bookRepository: Repository<Book> = getManager().getRepository(Book);

        const books: Book[] = await bookRepository.find();

        ctx.status = status.OK;
        ctx.body = books;
    }

    public static async getBook(ctx: BaseContext) {

        const bookRepository: Repository<Book> = getManager().getRepository(Book);

        const book: Book = await bookRepository.findOne(+ctx.params.id || 0);

        if (!book) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = 'The book you are trying to retrieve doesn\'t exist in the db';
            return;
        }

        ctx.status = status.OK;
        ctx.body = book;
    }

    public static async createBook(ctx: BaseContext) {

        const bookRepository: Repository<Book> = getManager().getRepository(Book);

        const bookToBeSaved: Book = new Book();
        bookToBeSaved.name = ctx.request.body.name;
        bookToBeSaved.description = ctx.request.body.description;
        bookToBeSaved.date = ctx.request.body.date;

        const errors: ValidationError[] = await validate(bookToBeSaved); // errors is an array of validation errors

        if (errors.length > 0) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = errors;
            return;
        }

        if (await bookRepository.findOne({ email: bookToBeSaved.email })) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = 'The specified e-mail address already exists';
            return;
        }

        const book = await bookRepository.save(bookToBeSaved);
        ctx.status = status.CREATED;
        ctx.body = book;
    }

    public static async updateBook(ctx: BaseContext) {
        const bookRepository: Repository<Book> = getManager().getRepository(Book);

        const bookToBeUpdated: Book = new Book();
        bookToBeUpdated.id = +ctx.params.id || 0;
        bookToBeUpdated.name = ctx.request.body.name;
        bookToBeUpdated.description = ctx.request.body.description;
        bookToBeUpdated.date = ctx.request.body.date;

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

        if (await bookRepository.findOne({ id: Not(Equal(bookToBeUpdated.id)), email: bookToBeUpdated.email })) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = 'The specified e-mail address already exists';
            return;
        }

        const book = await bookRepository.save(bookToBeUpdated);
        ctx.status = status.CREATED;
        ctx.body = book;
    }

    public static async deleteBook(ctx: BaseContext) {
        const bookRepository = getManager().getRepository(Book);

        const bookToRemove: Book = await bookRepository.findOne(+ctx.params.id || 0);

        if (!bookToRemove) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = 'The book you are trying to delete doesn\'t exist in the db';
            return;
        }

        if (+ctx.state.book.id !== bookToRemove.id) {
            ctx.status = status.FORBIDDEN;
            ctx.body = 'A book can only be deleted by himself';
            return;
        }

        await bookRepository.remove(bookToRemove);
        ctx.status = status.NO_CONTENT;
    }
}
