import { createSchema }    from "graphql-yoga";
import { Query }    from "./resolvers/Query";
import { Cv }       from "./resolvers/Cv";
import path from "path";
import fs from "fs";
import {Mutation} from "./resolvers/Mutation";

import { Subscription } from "./resolvers/Subscription";


// Charge tous les .gql sous src/schema/
const typeDefs = fs.readFileSync(
    path.join(__dirname, "../schema/schema.gql"),
    "utf-8"
  );
export const schema = createSchema({
  typeDefs,
  resolvers: {
    Query,
    Cv,

    Mutation,
    Subscription},

    Mutation
  },

});
