import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entity/user';
import { Book } from '../entity/book';

import {randomString} from '../functions'
import { isDate } from 'util';

export default class BookController {

    public static async getUserBooks (ctx: BaseContext) {

        const userRepository: Repository<User> = getManager().getRepository(User);

        const user: User = await userRepository.findOne({
            where: {id: ctx.params.id},
            relations: ['books'],
        });
    
        if (!user) {
            ctx.status = 400;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            return;
        }

        ctx.status = 200;
        ctx.body = user.books;

    }

    public static async createUserBook (ctx: BaseContext) {

        const userRepository: Repository<User> = getManager().getRepository(User);

        const user: User = await userRepository.findOne({
            where: {id: ctx.params.id},
            relations: ['books'],
        });
    
        if (!user) {
            ctx.status = 400;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            return;
        }

        const bookRepository: Repository<Book> = getManager().getRepository(Book);

        const bookToBeSaved: Book = new Book();
        bookToBeSaved.name = ctx.request.body.name;
        bookToBeSaved.description = ctx.request.body.description;
        bookToBeSaved.user = user;

        const errors: ValidationError[] = await validate(bookToBeSaved); // errors is an array of validation errors
//        ctx.body = JSON.stringify(bookToBeSaved);

        if (errors.length > 0) {
            ctx.status = 400;
            ctx.body = errors;
        } else if ( await bookRepository.findOne({ name: bookToBeSaved.name}) ) {
            ctx.status = 400;
            ctx.body = 'The exact book already exists';
        } else {
            const book = await bookRepository.save(bookToBeSaved);
            ctx.status = 201;
            ctx.body = book;
        }
        ctx.body = 'ready';
        return;
    }

    public static async updateBook (ctx: BaseContext) {

        const userRepository: Repository<User> = getManager().getRepository(User);

        const user: User = await userRepository.findOne({
            where: {id: ctx.params.id},
            relations: ['books'],
        });
    
        if (!user) {
            ctx.status = 400;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            return;
        }

        const bookRepository: Repository<Book> = getManager().getRepository(Book);

        const bookToBeSaved: Book = new Book();
        bookToBeSaved.id = +ctx.params.bookId || 0;
        bookToBeSaved.name = ctx.request.body.name;
        bookToBeSaved.description = ctx.request.body.description;
        bookToBeSaved.user = user;

        const errors: ValidationError[] = await validate(bookToBeSaved); 

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = 400;
            ctx.body = errors;
        } else if ( !await bookRepository.findOne(bookToBeSaved.id) ) {
            // check if a user with the specified id exists
            // return a BAD REQUEST status code and error message
            ctx.status = 400;
            ctx.body = 'The book you are trying to update doesn\'t exist in the db';
        } else if ( await bookRepository.findOne({ id: Not(Equal(bookToBeSaved.id)) , name: bookToBeSaved.name}) ) {
            ctx.status = 400;
            ctx.body = 'The specified book name already exists';
        } else {
            const book = await bookRepository.save(bookToBeSaved);
            ctx.status = 201;
            ctx.body = book;
        }
    }

    public static async deleteBook (ctx: BaseContext) {

        const userRepository: Repository<User> = getManager().getRepository(User);

        const user: User = await userRepository.findOne({
            where: {id: ctx.params.id},
            relations: ['books'],
        });
    
        if (!user) {
            ctx.status = 400;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            return;
        }

        const bookRepository: Repository<Book> = getManager().getRepository(Book);

        const bookToBeDeleted: Book = await bookRepository.findOne({
            where: {id: ctx.params.book_id || 0},
            relations: ['user'],
        });
        
        if (!bookToBeDeleted) {
            ctx.status = 400;
            ctx.body = 'The book you are trying to delete doesn\'t exist in the db';
        } else if (+ctx.state.user.id !== bookToBeDeleted.user.id) {
            ctx.status = 403;
            ctx.body = 'A book can only be deleted by himself';
        } else {
            await bookRepository.remove(bookToBeDeleted);
            ctx.status = 204;
        }
    }
}

