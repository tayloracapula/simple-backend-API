import { Hono } from "hono";
import { DatabaseManager } from "./db/DBManagement";
import { Server } from "server/core";
import dotenv from "dotenv";
import "reflect-metadata";
import { UserRoutes } from "server/routes/userRoutes";
import { AdminRoutes } from "server/routes/adminRoutes";

const defaultPort = 8080;
const defaultDbName = "./db/api.sqlite";

dotenv.config();
let port = Number(process.env.PORT);
let dbName = process.env.DATABASE;

if (typeof dbName !== "string" || typeof dbName == null) {
    console.warn(`Invalid database name, using default name ${defaultDbName}`);
    dbName = defaultDbName;
} else if (!dbName.endsWith(".sqlite")) {
    console.warn(`Database name doesn't end with .sqlite, using: ${dbName}.sqlite`);
    dbName = `${dbName}.sqlite`;
}

if (isNaN(port) || port < 1 || port > 65535) {
    console.warn(
        `Invalid port ${process.env.PORT}, using default port ${defaultPort}`
    );
    port = defaultPort;
}

const server = new Server(port, dbName).addRoute(new AdminRoutes());

await server.initialiseRoutes();
export default server.app;
