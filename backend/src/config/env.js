import dotenv from "dotenv";

dotenv.config();

/**
 * Env config (optional) – validate or expose env vars
 */
export const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/excel-report",
  NODE_ENV: process.env.NODE_ENV || "development",
};
