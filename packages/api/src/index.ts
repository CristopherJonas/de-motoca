import { errorHandler } from 'graphql-api-koa';
import router from './routes';

const Bodyparser = require('koa-bodyparser');

import Koa = require('koa');

const app = new Koa();
app.use(Bodyparser());
app.use(errorHandler());
app.use(async (_ctx, next) => {
  try {
    const response = await next();
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
});
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8000);
