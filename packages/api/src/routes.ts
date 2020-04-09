import { execute } from 'graphql-api-koa';
import { schema } from './graphql';
import { getContext } from './graphql/context';

import Router = require('@koa/router');

const router = new Router();

router.get('/hello', (ctx) => {
  ctx.body = 'FLAMENGO';
});

router.post(
  '/graphql',
  execute({
    schema,
    contextValue: getContext(),
  }),
);

export default router;
