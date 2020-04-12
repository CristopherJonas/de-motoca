import { errorHandler } from 'graphql-api-koa';
import router from './routes';
import { customError } from './middlewares/customError';
import { auth } from './middlewares/auth';

const Bodyparser = require('koa-bodyparser');

import Koa = require('koa');

const app = new Koa();
app.use(Bodyparser());
app.use(errorHandler());
app.use(customError);
app.use(auth);
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8000);
