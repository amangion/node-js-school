import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { 
	BAD_REQUEST,
	NO_CONTENT,
	NOT_FOUND,
	FORBIDDEN,
	CREATED,
	OK,
} from 'http-status-codes';

import { User } from '../entities';

export class UsersController {

	public static async getUsers (ctx: BaseContext) {

		const UserRepository: Repository<User> = getManager().getRepository(User);

		const users: User[] = await UserRepository.find();

		ctx.status = OK;
		ctx.body = users;
	}

	public static async getUser (ctx: BaseContext) {

		const UserRepository: Repository<User> = getManager().getRepository(User);
		const id = +ctx.params.id;

		const user: User = await UserRepository.findOne(id, { relations : [ 'books' ]});

		if (!user) {
			ctx.throw(NOT_FOUND, 'The user you are trying to retrieve doesn\'t exist in the db' );
		}

		ctx.status = OK;
		ctx.body = user;
	}

	public static async createUser (ctx: BaseContext) {

		const UserRepository: Repository<User> = getManager().getRepository(User);
		const { name, email } = ctx.request.body;

		if ( await UserRepository.findOne({ email }) ) {
			ctx.throw(BAD_REQUEST, 'The specified e-mail address already exists');
		}

		const userToBeSaved: User = UserRepository.create({
			name,
			email,
		});

		const errors: ValidationError[] = await validate(userToBeSaved);

		if (errors.length > 0) {
			ctx.throw(BAD_REQUEST, 'Bad request', { errors });
		}

		const user = await UserRepository.save(userToBeSaved);

		ctx.status = CREATED;
		ctx.body = user;
	}

	public static async updateUser (ctx: BaseContext) {

		const UserRepository: Repository<User> = getManager().getRepository(User);

		const id = +ctx.params.id;
		const { email, name } = ctx.request.body;

		if ( !await UserRepository.findOne(id) ) {
			ctx.throw(BAD_REQUEST, 'The user you are trying to update doesn\'t exist in the db');
		}

		if ( await UserRepository.findOne({ id: Not(Equal(id)) , email }) ) {
			ctx.throw(BAD_REQUEST, 'The specified e-mail address already exists');
		}

		const userToBeUpdated: User = UserRepository.create({
			id,
			name,
			email,
		});

		const errors: ValidationError[] = await validate(userToBeUpdated);

		if (errors.length > 0) {
			ctx.throw(BAD_REQUEST, 'Bad request', { errors });
		}

		const user = await UserRepository.save(userToBeUpdated);

		ctx.status = OK;
		ctx.body = user;
	}

	public static async deleteUser (ctx: BaseContext) {

		const UserRepository = getManager().getRepository(User);

		const userToRemove: User = await UserRepository.findOne(+ctx.params.id || 0);

		if (!userToRemove) {
			ctx.throw(BAD_REQUEST, 'The user you are trying to delete doesn\'t exist in the db');
		}

		if (+ctx.state.user.id !== userToRemove.id) {
			ctx.throw(FORBIDDEN, 'A user can only be deleted by himself');
		}

		await UserRepository.remove(userToRemove);
		ctx.status = NO_CONTENT;
	}
}
