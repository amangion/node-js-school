import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entity/user';
import { Book } from '../entity/book';

export default class BookController {

    public static async getUserBooks (ctx: BaseContext) {

        // get a book repository to perform operations with book
        const bookRepository: Repository<Book> = getManager().getRepository(Book);
        const userRepository: Repository<User> = getManager().getRepository(User);

        const user: User = await userRepository.findOne(+ctx.params.id);

        // check if user exists
        if(!user) {
            ctx.status = 404;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            return;
        }

        // load books by user's id
        const userBooks: Book[] = await bookRepository.find({
            where: {
                user: user.id
            }
        });

        // return OK status code and loaded user object
        ctx.status = 200;
        ctx.body = userBooks;
    }

    public static async createUserBook (ctx: BaseContext) {

        const bookRepository: Repository<Book> = getManager().getRepository(Book);
        const userRepository: Repository<User> = getManager().getRepository(User);

        const user: User = await userRepository.findOne(+ctx.params.id);

        // check if user exists
        if(!user) {
            ctx.status = 404;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            return;
        }

        try {            

            const { name, description, date } = ctx.request.body;

            // build up entity book
            const newBook: Book = new Book();
            newBook.name = name;
            newBook.description = description;
            newBook.date = date;
    
            // validate book entity
            const errors: ValidationError[] = await validate(newBook);
    
            if (errors.length > 0) {
                // return BAD REQUEST status code and errors array
                ctx.status = 400;
                ctx.body = errors;
                return;
            }    
            newBook.user = user;

            // save the book contained in the POST body
            const book = await bookRepository.save(newBook);

            // return CREATED status code and updated user
            ctx.status = 201;
            ctx.body = book;
            
        } catch (error) {
            ctx.status = 404;
            ctx.body = error.message;
            return;
        }   
    }




  }
