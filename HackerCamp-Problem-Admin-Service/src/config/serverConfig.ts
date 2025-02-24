import "dotenv/config";

export const PORT = process.env.PORT || 6060;
export const DB_CONNECTION = process.env.DB_CONNECTION;
export const NODE_ENV = process.env.NODE_ENV;
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://mongo:27017/problems";
