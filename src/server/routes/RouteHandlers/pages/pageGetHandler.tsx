/** @jsx jsx */
/** @jsxImportSource hono/jsx */
import type { Context, Hono } from "hono";
import { RouteHandler } from "../RouteHandler";
import { HomePage } from "server/handlers/views/pages/HomePage";

export class PageGetHandler extends RouteHandler {
    constructor(app: Hono) {
        super(app);
    }
    registerRoutes(): void {
        this.app.get("", this.home.bind(this));
    }

    private async home(c: Context) {
        try {
            return c.html(<HomePage />);
        } catch (error) {
            return this.handleError(error, "Failed to serve home page", c);
        }
    }
}
