import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";

export const createRoutes = () => {
    const app = new Hono();

    app.use('*',prettyJSON());

}