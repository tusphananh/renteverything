import redis from "redis";
import { logCyan } from './console';

let redisClient: any;

// Max age 10 minutes
// const maxAge = 10 * 60;

export const startRedisServer = async () => {
    if (!redisClient) {
        // Url with username,password, host, port and database number for redis
        const url = `redis://${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${process.env.REDIS_DB}`;

        redisClient = redis.createClient({
            url: url,
        });

        redisClient.on('error', (err: string) => {
            console.log('Redis error: ', err);
        });

        redisClient.on('connect', () => {
            logCyan('Redis connected');
        });
    }
};

export const addRedisObjectValue = (key: string, value: any) => {
    redisClient.set(key, JSON.stringify(value));
}

export const getRedisObjectValue = (key: string) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err: any, reply: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(reply));
            }
        });
    }
    );
}

export const getAllRedisKeys = () => {
    return new Promise((resolve, reject) => {
        redisClient.keys('*', (err: any, reply: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    }
    );
}

export const removeRedisValue = (key: string) => {
    redisClient.del(key);
}