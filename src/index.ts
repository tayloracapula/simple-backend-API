import "reflect-metadata";
import dotenv from "dotenv";
import { ServerCore } from "server/ServerCore";
import { UserRoutes } from "server/routes/userRoutes";
import { AdminRoutes } from "server/routes/adminRoutes";
import { ManagerRoutes } from "server/routes/managerRoutes";
import { Logger } from "server/Logger";
import { LoginRoutes } from "server/routes/LoginRoutes";
import { ViewRoutes } from "server/routes/ViewRoutes";

const defaultPort = 8080;
const defaultDbName = "./db/api.sqlite";

dotenv.config();
let port = Number(process.env.PORT);
let dbName = process.env.DATABASE;

if (!process.env.JWT_SECRET||typeof process.env.JWT_SECRET == null) {
    Logger.error("CRITICAL ERROR: JWT_SECRET environment variable not set");
    process.exit(1);
}

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
Logger.debug("Beginning server creation")
const server = new ServerCore(port, dbName);
Logger.debug("Adding Routes")
server.getRouteManager()
    .addRoute(new ViewRoutes())
    .addRoute(new LoginRoutes())
    .addRoute(new AdminRoutes())
    .addRoute(new ManagerRoutes())
    .addRoute(new UserRoutes());


await server.initialiseRoutes();

process.on('SIGINT', async () => {
    Logger.warn("Server Shutting Down");
    try {
        await server.shutdown();
    } catch (error) {
        Logger.error("Error During Shutdown",error)
    }    
    Logger.warn("Server Shutdown Complete");
    process.exit(0);
})

export default server.app;
