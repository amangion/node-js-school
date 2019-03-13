import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User, Book } from './../entities';

export class BooksController {

  public static async getBooks (ctx: BaseContext) {
    const BooksRepository = getManager().getRepository(Book);

    const userId = +ctx.params.user_id;

    const books: Book[] = await BooksRepository.find({ owner: { id: userId } });

		ctx.status = 200;
		ctx.body = books;
  }

  public static async createBook (ctx: BaseContext) {
    const BooksRepository = getManager().getRepository(Book);

    const bookToBeSaved: Book = new Book();
    const id = +ctx.params.user_id;

		bookToBeSaved.name = ctx.request.body.name;
    bookToBeSaved.description = ctx.request.body.description;
    bookToBeSaved.date = new Date(ctx.request.body.date);
    bookToBeSaved.owner = { id } as User;
    
    const errors: ValidationError[] = await validate(bookToBeSaved); 

    if (errors.length > 0) {
			ctx.status = 400;
      ctx.body = errors;
      return;
    }

    const book = await BooksRepository.save(bookToBeSaved);
    ctx.status = 201;
    ctx.body = book;
  }

  public static async updateBook (ctx: BaseContext) {

  }

  public static async deleteBook (ctx: BaseContext) {

  }
}

