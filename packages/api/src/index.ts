import router from './routes';

import Koa = require('koa');

const app = new Koa();

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8000);
