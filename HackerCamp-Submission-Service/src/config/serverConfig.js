const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 8080,
  DB_CONNECTION: process.env.DB_CONNECTION,
  NODE_ENV: process.env.NODE_ENV,
  REDIS_PORT: process.env.REDIS_PORT || '6379',
  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  PROBLEM_ADMIN_SERVICE_URL: process.env.PROBLEM_ADMIN_SERVICE_URL,
  SOCKET_SERVER_URL: process.env.SOCKET_SERVER_URL,
}