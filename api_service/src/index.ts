// Start Express Server

require("dotenv").config();
require("reflect-metadata");
const express = require("express");
const cors = require("cors");
import fs from "fs";
import { corsOptions } from "./configs/CorsOptions";
import { ApolloConnection } from "./utils/ApolloConnection";
import { postgresqlConnection } from "./utils/PostgresqlConnection";
import { redisSession } from "./utils/RedisConnection";
import { uploadFolder } from "./configs/FolderConstants";
import { graphqlUploadExpress } from 'graphql-upload';
/**
 * TypeScript need main asysnc function
 */

const main = async () => {
  //If folder image not exist, create folder at ../uploads
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
  }
  const app = express();
  app.use(cors(corsOptions));
  // app.set('trust proxy', 1);
  app.use(graphqlUploadExpress())
  /**
   * Redis Connection
   */
  const redisConnection = await redisSession();
  if (redisConnection) {
    app.use(redisConnection);
    console.log("Redis Connection Success");
  } else {
    console.log("Redis Connection Failed");
  }

  /**
   * Database Connection
   */
  const dbConnection = await postgresqlConnection();
  if (dbConnection) {
    console.log("Database Connection Success");
  } else {
    console.log("Database Connection Error");
  }

  /**
   * Apollo Server
   */
  const apolloServer = await ApolloConnection();
  if (apolloServer) {
    console.log("Apollo Server Success");
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
  } else {
    console.log("Apollo Server Error");
  }

  /**
   * Start Express Server
   */

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(
      `Server is on http://localhost:${PORT} and graphql at http://localhost:${PORT}/graphql and front-end : ${process.env.FRONTEND_URL}`
    );
  });
};

main().catch((error) => console.log(error));
