
import * as compose from 'koa-compose';
import * as Router from 'koa-router';

function composeRouters (routers: Router[]) {
    const middlewares = [];

    routers.forEach(router => {
      middlewares.push(router.routes());
      middlewares.push(router.allowedMethods());
    });

    return compose(middlewares);
}

export { composeRouters };