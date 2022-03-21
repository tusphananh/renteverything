import { createConnection } from "typeorm";
import Activity from "../entities/Activity";
import Chat from "../entities/Chat";
import Item from "../entities/Item";
import Message from "../entities/Message";
import User from "../entities/User";

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
