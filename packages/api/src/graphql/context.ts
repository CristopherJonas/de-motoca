import { ParameterizedContext } from 'koa';
import { models } from '../db';
import { UserModel } from '../db/models/User';

export function getContext(ctx: ParameterizedContext) {
  return {
    models,
    user: ctx.state.user as UserModel | undefined,
  };
}

export type GraphQLContext = ReturnType<typeof getContext>;
