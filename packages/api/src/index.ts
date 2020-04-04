import router from './routes';

const Bodyparser = require('koa-bodyparser');

import Koa = require('koa');

const app = new Koa();
app.use(Bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8000);
