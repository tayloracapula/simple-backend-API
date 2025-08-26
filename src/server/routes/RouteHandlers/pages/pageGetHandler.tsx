/** @jsx jsx */
/** @jsxImportSource hono/jsx */
import type { Context, Hono } from "hono";
import { RouteHandler } from "../RouteHandler";
import { LoginPage } from "server/handlers/views/pages/LoginPage";

export class PageGetHandler extends RouteHandler {
    constructor(app: Hono) {
        super(app);
    }
    registerRoutes(): void {
        this.app.get("", this.login.bind(this));
    }

    private async login(c: Context) {
        try {
            return c.html(<LoginPage/>);
        } catch (error) {
            return this.handleError(error, "Failed to serve home page", c);
        }
    }
}
