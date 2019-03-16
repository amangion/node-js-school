import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entity/user';
import { Book } from '../entity/book';

import {randomString} from '../functions'

export default class UserController {

    public static async seedData (ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);
//        const bookRepository: Repository<Book> = getManager().getRepository(Book);
        ctx.body = "Attempt to create 1 user... ";
/*
        const book = new Book();
        book.id = 1;
        book.name = "Book Name";
        book.description = "Book description.";
        book.date = Date.now();
        await bookRepository.save(book);
*/        
        const user = new User();
        user.name = "Timber_" + randomString(2);
        user.email = user.name + "@mail.ru"; 
        await userRepository.save(user);
/*
        ctx.body = book.id + ' ';
        ctx.body += book.name + ' ';
        ctx.body += book.description + ' ';
        ctx.body += book.date + ' ';
        ctx.body += book.id + ' ';
*/
        ctx.body += " User created.";
        ctx.status = 201;
    }

    public static async getUsers (ctx: BaseContext) {

        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        // load all users
        const users: User[] = await userRepository.find();
        // return OK status code and loaded users array
        ctx.status = 200;
        ctx.body = users;
/*
        const bookRepository: Repository<Book> = getManager().getRepository(Book);
        const books: Book[] = await bookRepository.find();
        ctx.body = books;
*/
    }

    public static async getUser (ctx: BaseContext) {

        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        // load user by id
        const user: User = await userRepository.findOne(+ctx.params.id || 0);

        if (!user) {
            ctx.status = 400;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            return;
        }
        // return OK status code and loaded user object
        ctx.status = 200;
        ctx.body = user;

    }

    public static async createUser (ctx: BaseContext) {
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        const userToBeSaved: User = new User();
        userToBeSaved.name = ctx.request.body.name;
        userToBeSaved.email = ctx.request.body.email;

        const errors: ValidationError[] = await validate(userToBeSaved); // errors is an array of validation errors

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = 400;
            ctx.body = errors;
        } else if ( await userRepository.findOne({ email: userToBeSaved.email}) ) {
            // return BAD REQUEST status code and email already exists error
            ctx.status = 400;
            ctx.body = 'The specified e-mail address already exists';
        } else {
            // save the user contained in the POST body
            const user = await userRepository.save(userToBeSaved);
            // return CREATED status code and updated user
            ctx.status = 201;
            ctx.body = user;
        }
    }

    public static async updateUser (ctx: BaseContext) {

        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        // update the user by specified id
        // build up entity user to be updated
        const userToBeUpdated: User = new User();
        userToBeUpdated.id = +ctx.params.id || 0; // will always have a number, this will avoid errors
        userToBeUpdated.name = ctx.request.body.name;
        userToBeUpdated.email = ctx.request.body.email;
        // validate user entity
        const errors: ValidationError[] = await validate(userToBeUpdated); // errors is an array of validation errors

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = 400;
            ctx.body = errors;
        } else if ( !await userRepository.findOne(userToBeUpdated.id) ) {
            // check if a user with the specified id exists
            // return a BAD REQUEST status code and error message
            ctx.status = 400;
            ctx.body = 'The user you are trying to update doesn\'t exist in the db';
        } else if ( await userRepository.findOne({ id: Not(Equal(userToBeUpdated.id)) , email: userToBeUpdated.email}) ) {
            // return BAD REQUEST status code and email already exists error
            ctx.status = 400;
            ctx.body = 'The specified e-mail address already exists';
        } else {
            // save the user contained in the PUT body
            const user = await userRepository.save(userToBeUpdated);
            // return CREATED status code and updated user
            ctx.status = 201;
            ctx.body = user;
        }
    }

    public static async deleteUser (ctx: BaseContext) {

        // get a user repository to perform operations with user
        const userRepository = getManager().getRepository(User);
        // find the user by specified id
        const userToRemove: User = await userRepository.findOne(+ctx.params.id || 0);
        if (!userToRemove) {
            // return a BAD REQUEST status code and error message
            ctx.status = 400;
            ctx.body = 'The user you are trying to delete doesn\'t exist in the db';
        } else if (+ctx.state.user.id !== userToRemove.id) {
            // check user's token id and user id are the same
            // if not, return a FORBIDDEN status code and error message
            ctx.status = 403;
            ctx.body = 'A user can only be deleted by himself';
        } else {
            // the user is there so can be removed
            await userRepository.remove(userToRemove);
            // return a NO CONTENT status code
            ctx.status = 204;
        }
    }

  }

