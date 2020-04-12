import { Middleware } from 'koa';
import { promisify } from 'util';
import { verify, GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import { models } from '../db';

const verifyAsync = promisify<
  string,
  Secret | GetPublicKeyOrSecret,
  object | undefined
>(verify);
export const auth: Middleware = async (ctx, next) => {
  const authorization =
    ctx.request.headers.authorization || ctx.request.headers.Authorization;

  if (!authorization) return next();

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') throw new Error('invalid token');

  const tokenData = (await verifyAsync(
    token,
    process.env.API_SECRET as string,
  )) as { userId?: string };

  const { userId } = tokenData;
  if (!userId) throw new Error('invalid token');

  const user = await models.User.findByPk(userId);
  if (!user) throw new Error('invalid token');

  ctx.state.user = user;
  return next();
};
