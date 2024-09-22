import { createClient } from 'redis';

const redisClient = createClient({
    url: process.env.REDIS_URL, // Ensure you have this in your .env file
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

const connectRedis = async () => {
    await redisClient.connect();
};

export { redisClient, connectRedis };