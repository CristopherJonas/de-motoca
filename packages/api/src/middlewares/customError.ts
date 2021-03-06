import { Middleware } from 'koa';

export const customError: Middleware = async (_ctx, next) => {
  try {
    const response = await next();
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
  }
};
