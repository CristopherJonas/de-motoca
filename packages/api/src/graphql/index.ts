import { join } from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

function getTypes() {
  const typesArray = fileLoader(join(__dirname, 'modules/**/types/*.graphql'));
  return mergeTypes(typesArray);
}

function getResolvers() {
  const resolversArray = fileLoader(
    join(__dirname, 'modules/**/*.resolvers.*s'),
  );
  return mergeResolvers(resolversArray);
}

function createSchema() {
  const typeDefs = getTypes();
  const resolvers = getResolvers();
  const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  return executableSchema;
}

export const schema = createSchema();
