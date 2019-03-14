import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User, Book } from './../entities';

export class BooksController {

  public static async getBooks (ctx: BaseContext) {

    const BooksRepository: Repository<Book> = getManager().getRepository(Book);

    const ownerId = +ctx.params.user_id;

    const books: Book[] = await BooksRepository.find({ ownerId } );

		ctx.status = 200;
		ctx.body = books;
  }

  public static async createBook (ctx: BaseContext) {

    const BooksRepository: Repository<Book> = getManager().getRepository(Book);
    const UsersRepository = getManager().getRepository(User);

    const userId = +ctx.params.user_id;

    if ( !await UsersRepository.findOne({ id: userId }) ) {
      ctx.throw(404, 'The user you are trying to create book doesn\'t exist in the db');
    }

    const bookToBeSaved = BooksRepository.create({
      name: ctx.request.body.name,
      description: ctx.request.body.description,
      date: ctx.request.body.date,
      ownerId: userId,
    });

    const errors: ValidationError[] = await validate(bookToBeSaved);

    if (errors.length > 0) {
      ctx.throw(400, 'Bad request', { errors });
    }

    const book: Book = await BooksRepository.save(bookToBeSaved);
    ctx.status = 201;
    ctx.body = book;
  }

  public static async updateBook (ctx: BaseContext) {

    const BooksRepository: Repository<Book> = getManager().getRepository(Book);
    const UsersRepository = getManager().getRepository(User);

    const userId = +ctx.params.user_id;
    const id = +ctx.params.id;

    if ( !await UsersRepository.findOne({ id: userId }) ) {
      ctx.throw(404, 'The user you are trying to update book for doesn\'t exist in the db');
    }

    if ( !await BooksRepository.findOne({ id }) ) {
      ctx.throw(404, 'The book you are trying to update doesn\'t exist in the db');
    }

    const bookToBeUpdated: Book = BooksRepository.create({
      id,
      name: ctx.request.body.name,
      date: ctx.request.body.date,
      description: ctx.request.body.description,
    });

    const errors: ValidationError[] = await validate(bookToBeUpdated);

    if (errors.length > 0) {
      ctx.throw(400, 'Bad request', { errors });
    }

    const book: Book = await BooksRepository.save(bookToBeUpdated);

    ctx.status = 200;
    ctx.body = book;
  }

  public static async deleteBook (ctx: BaseContext) {

    const BooksRepository: Repository<Book> = getManager().getRepository(Book);
    const id = +ctx.params.id;

    const bookToRemove: Book = await BooksRepository.findOne(id);

    if (!bookToRemove) {
      ctx.throw(400, 'The book you are trying to delete doesn\'t exist in the db');
    }

    await BooksRepository.remove(bookToRemove);

    ctx.status = 204;
  }
}

