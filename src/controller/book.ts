import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entity/user';
import { Book } from '../entity/book';

export default class BookController {

    public static async getUserBooks (ctx: BaseContext) {

        // get a book repository to perform operations with book
        const bookRepository: Repository<Book> = getManager().getRepository(Book);

        // load books by user's id
        const userBooks: Book[] = await bookRepository.find({
            where: {
                user: +ctx.params.id || 0
            }
        });

        if (!userBooks) {
            ctx.status = 400;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            return;
        }

        // return OK status code and loaded user object
        ctx.status = 200;
        ctx.body = userBooks;
    }

  }
