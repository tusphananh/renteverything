import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer, gql } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ActivityResolver } from "../resolvers/ActivityResolver";
import { ChatResolver } from "../resolvers/ChatResolver";
import { ImageIDResolver } from "../resolvers/ImageIDResolver";
import { ItemResolver } from "../resolvers/ItemResolver";
import { UserResolver } from "../resolvers/UserResolver";
import { Context } from "../types/Context";

const typeDefs = gql`
  # The implementation for this scalar is provided by the
  # 'GraphQLUpload' export from the 'graphql-upload' package
  # in the resolver map below.
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    # This is only here to satisfy the requirement that at least one
    # field be present within the 'Query' type.  This example does not
    # demonstrate how to fetch uploads back.
    otherFields: Boolean!
  }

  type Mutation {
    # Multiple uploads are supported. See graphql-upload docs for details.
    singleUpload(file: Upload!): File!
  }
`;

export const ApolloConnection = async () => {
  try {
    const apolloServer = new ApolloServer({
      typeDefs,
      schema: await buildSchema({
        resolvers: [UserResolver, ItemResolver, ActivityResolver, ChatResolver,ImageIDResolver],
        validate: false,

      }),
      context: ({ req, res }): Context => ({ req, res }),
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });
    return apolloServer;
  } catch (error) {
    console.log(error);
    return null;
  }
};
