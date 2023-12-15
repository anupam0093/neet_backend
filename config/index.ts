import { config } from "dotenv";
const dev = process.env.NODE_ENV !== "production";
config({
  path: `.env.${dev ? "development" : process.env.NODE_ENV}`,
  override: true,
});

export const { NODE_ENV } = process.env;
