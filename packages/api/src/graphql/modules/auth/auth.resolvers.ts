import { promisify } from 'util';
import { compare } from 'bcrypt';
import { sign, SignOptions, Secret } from 'jsonwebtoken';
import { IResolvers } from '../../generated/schema';

const signAsync = promisify<
  string | Buffer | object,
  Secret,
  SignOptions,
  string
>(sign);

const resolvers: IResolvers = {
  Mutation: {
    login: async (_parent, args, ctx) => {
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
    },
  },
};

export default resolvers;
