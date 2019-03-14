import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entity/user';
import status = require('http-status');

export default class UserController {

    public static async getUsers(ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);

        const users: User[] = await userRepository.find();

        ctx.status = status.OK;
        ctx.body = users;
    }

    public static async getUser(ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);

        const user: User = await userRepository.findOne(+ctx.params.uid || 0);

        if (!user) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            return;
        }

        ctx.status = status.OK;
        ctx.body = user;
    }

    public static async createUser(ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);

        const userToBeSaved: User = new User();
        userToBeSaved.name = ctx.request.body.name;
        userToBeSaved.email = ctx.request.body.email;

        const errors: ValidationError[] = await validate(userToBeSaved); // errors is an array of validation errors

        if (errors.length > 0) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = errors;
            return;
        }

        if (await userRepository.findOne({ email: userToBeSaved.email })) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = 'The specified e-mail address already exists';
            return;
        }

        const user = await userRepository.save(userToBeSaved);
        ctx.status = status.CREATED;
        ctx.body = user;
    }

    public static async updateUser(ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);

        const userToBeUpdated: User = new User();
        userToBeUpdated.id = +ctx.params.uid || 0;
        userToBeUpdated.name = ctx.request.body.name;
        userToBeUpdated.email = ctx.request.body.email;

        const errors: ValidationError[] = await validate(userToBeUpdated);

        if (errors.length > 0) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = errors;
            return;
        }

        if (!await userRepository.findOne(userToBeUpdated.id)) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = 'The user you are trying to update doesn\'t exist in the db';
            return;
        }

        if (await userRepository.findOne({ id: Not(Equal(userToBeUpdated.id)), email: userToBeUpdated.email })) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = 'The specified e-mail address already exists';
            return;
        }

        const user = await userRepository.save(userToBeUpdated);
        ctx.status = status.CREATED;
        ctx.body = user;
    }

    public static async deleteUser(ctx: BaseContext) {
        const userRepository = getManager().getRepository(User);

        const userToRemove: User = await userRepository.findOne(+ctx.params.uid || 0);

        if (!userToRemove) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = 'The user you are trying to delete doesn\'t exist in the db';
            return;
        }

        // if (+ctx.state.user.id !== userToRemove.id) {
        //     ctx.status = status.FORBIDDEN;
        //     ctx.body = 'A user can only be deleted by himself';
        //     return;
        // }

        await userRepository.remove(userToRemove);
        ctx.status = status.NO_CONTENT;
    }
}
