const express = require('express');
const app = express();
const expressGraphQL = require('express-graphql').graphqlHTTP;

import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";

import { AppResolver } from "./resolvers/AppResolver";

async function main() {
  await createConnection();
  const schema = await buildSchema({ resolvers: [AppResolver] });
  app.use('/graphql', expressGraphQL({
      schema: schema,
      graphiql: true
  }));
  app.listen(3000., () => console.log('Server Running'));
}

main();

