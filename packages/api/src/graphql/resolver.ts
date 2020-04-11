import { promisify } from 'util';
import { compare } from 'bcrypt';
import { sign, SignOptions, Secret } from 'jsonwebtoken';

import { GraphQLContext } from './context';

const signAsync = promisify<
  string | Buffer | object,
  Secret,
  SignOptions,
  string
>(sign);

type loginInput = {
  email: string;
  password: string;
  clientMutationId?: string | null;
};

const login = async (
  _parent: {},
  args: { input: loginInput },
  ctx: GraphQLContext,
) => {
  const user = await ctx.models.User.findOne({
    where: {
      email: args.input.email.toLowerCase(),
    },
  });
  if (!user) {
    return {
      clientMutationId: args.input.clientMutationId,
      error: ['Email ou password incorretos'],
    };
  }
  const valid = await compare(args.input.password, user.password_hash);
  if (!valid) {
    return {
      clientMutationId: args.input.clientMutationId,
      error: ['Email ou password incorretos'],
    };
  }
  const token = await signAsync(
    { userId: user.id },
    process.env.API_SECRET as string,
    {
      expiresIn: '1d',
    },
  );
  return {
    clientMutationId: args.input.clientMutationId,
    error: [''],
    token,
  };
};

function hello() {
  return 'HELLLOOOOOOO FLAMENGOOOO';
}

export const resolvers = {
  Query: {
    hello,
  },
  Mutation: {
    login,
  },
};
