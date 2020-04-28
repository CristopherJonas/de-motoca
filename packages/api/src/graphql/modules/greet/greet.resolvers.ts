import { GraphQLContext } from '../../context';

function hello(_parent: {}, _args: {}, ctx: GraphQLContext) {
  if (ctx.user) return `HELOO ${ctx.user.name}`;
  return 'HELLLOOOOOOO FLAMENGOOOO';
}

export default {
  Query: {
    hello,
  },
};
