import { BaseContext } from 'koa';
import { getManager, Repository } from 'typeorm';
import { User } from '../entity/user';

export default class BookController {

    public static async getBooks (ctx: BaseContext) {

        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);

        // load all users
        const user: User = await userRepository.findOne({
            where: { id: +ctx.params.id },
            relations: ['books'],
        });

        if (!user) {
            ctx.status = 400;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            return;
        }

        // return OK status code and loaded users array
        ctx.status = 200;
        ctx.body = user.books;
    }
}
