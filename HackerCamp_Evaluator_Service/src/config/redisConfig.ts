import { Redis } from "ioredis";

import ServerConfig from "./serverConfig";

const redisHost =
  ServerConfig.NODE_ENV === "development" ? ServerConfig.REDIS_HOST : "redis";

const redisConfig = {
  port: ServerConfig.REDIS_PORT,
  host: redisHost,
  maxRetriesPerRequest: null,
};

const redisConnection = new Redis(redisConfig);

export default redisConnection;
