import { createServer } from "node:http";
import { readFileSync } from "fs";
import path from "path";
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";

// Import resolvers
import { Query } from "./resolvers/Query";
import { Mutation } from "./resolvers/Mutation";
import { Subscription } from "./resolvers/Subscription";

// If you have type resolvers
import { Cv } from "./resolvers/Cv";


// Import context
import { context } from "./context";

// Read GraphQL schema
const typeDefs = readFileSync(
  path.join(__dirname, "../schema/schema.gql"),
    "utf-8"
);

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

// Create yoga server with GraphQL Subscriptions support
const yoga = createYoga({
  schema,
  context,
  graphiql: {
    subscriptionsProtocol: 'WS',
    defaultQuery: `# Welcome to GraphiQL
#
# Try running these queries:
#
# Query:
# query {
#   cvs {
#     id
#     name
#     job
#   }
# }
#
# Mutation:
# mutation {
#   createCv(input: {
#     name: "Test CV",
#     age: 30,
#     job: "Developer",
#     userId: 1
#   }) {
#     id
#     name
#   }
# }
#
# Subscription:
# subscription {
#   cvAdded {
#     id
#     name
#     job
#   }
# }
`
  }
});


const server = createServer(yoga);


server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000/graphql");
});