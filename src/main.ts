import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http'; //HTTP server
import { readFileSync } from 'fs';
import path from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { Query } from './resolvers/Query';
import { Mutation } from './resolvers/Mutation';
import { Subscription } from './resolvers/Subscription';
import { Cv } from './resolvers/Cv';
import { context } from './context';

// Load schema
const typeDefs = readFileSync(path.join(__dirname, '../schema/schema.gql'), 'utf-8');

// Create executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Cv,
  },
});

// Create Yoga instance
const yoga = createYoga({
  schema,
  context: () => context,
  graphiql: {
    subscriptionsProtocol: 'WS',
  },
});

// Create HTTP server and pass Yoga instance to it
const server = createServer(yoga);

// Start the server
server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});
