import { SESSION_COOKIE_NAME } from "../configs/CookieConstants";
import { COOKIE_SECURE } from "../configs/RedisConstants";

const redis = require("redis");
const connectRedis = require("connect-redis");
const session = require("express-session");

// const maxAge = 1000 * 60 * 10;
// Infinite Live Long
const maxAge = 1000 * 60 * 60 * 24 * 365;

export const redisSession = async () => {
  try {
    const RedisStore = connectRedis(session);
    const url = `redis://${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${process.env.REDIS_DB}`;
    const redisClient = redis.createClient({
      url: url,
    });

    const rs = await session({
      store: new RedisStore({ client: redisClient }),
      name: SESSION_COOKIE_NAME,
      secret: process.env.REDIS_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: COOKIE_SECURE, // if true only transmit cookie over https
        httpOnly: true, // if true prevent client side JS from reading the cookie
        maxAge: maxAge, // session max age in miliseconds
        sameSite: "lax", // if true cookie will be sent only over https
      },
    });

    return rs;
  } catch (error) {
    console.log(error);
    return null;
  }
};
