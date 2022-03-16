import Activity from "../entities/Activity";
import { createConnection } from "typeorm";
import Item from "../entities/Item";
import User from "../entities/User";
import Chat from "../entities/Chat";
import Message from "../entities/Message";

export const postgresqlConnection = async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      entities: [User, Item, Activity, Chat, Message],
    });

    return connection;
  } catch (error) {
    console.log(error);
    return null;
  }
};
