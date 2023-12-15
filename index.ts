import dotenv from "dotenv";
// const dev = process.env.NODE_ENV !== "production";
// const takeEnv = `.env${dev ? ".development" : ".production"}`;
dotenv.config();
dotenv.config({
  path: ".env",
  override: true,
});

import cors from "cors";

import express, { Express } from "express";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import rootEndPoint from "./config/endpoint";
import databaseConnect from "./config/database";
import blogsRoutes from "./routes/blogs";

// INITIALIZING EXPREESS
const app: Express = express();
const server = createServer(app);
const port = process.env.PORT;
databaseConnect();

// MIDDLEWARES
app.disable("x-powered-by");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ALLOWED_DOMAINS?.split(" "),
    optionsSuccessStatus: 200,
  })
);

const routes = [
  {
    path: `${rootEndPoint}/blogs`,
    func: blogsRoutes,
  },
];

routes.forEach(({ path, func }) => {
  app.use(path, func);
});

// PORT LISTEN
server.listen(port, () => {
  console.log(`Local Server Runnig on http://localhost:${port}`);
});

const activeUsers: IActiveUser[] = [];


