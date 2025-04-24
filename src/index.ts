import { Hono } from "hono";
import { DatabaseManager } from "db/DbManagement";
import {Server} from 'server/core';
import dotenv from 'dotenv';
import "reflect-metadata";


dotenv.config();
let port = Number(process.env.PORT); 



if (isNaN(port) || port < 1 || port > 65535) {
    console.warn(`Invalid port ${process.env.PORT}, using default port 8080`);
    port = 8080;
  }

const server = new Server(port, "./db/api.sqlite");

export default server.app;