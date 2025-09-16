/** @jsx jsx */
/** @jsxImportSource hono/jsx */
import type { Context, Hono } from "hono";
import { getCookie } from "hono/cookie";
import { RouteHandler } from "../RouteHandler";
import { LoginPage } from "server/handlers/views/pages/LoginPage";
import { Dashboard } from "server/handlers/views/pages/Dashboard";

export class PageGetHandler extends RouteHandler {
    constructor(app: Hono) {
        super(app);
    }
    registerRoutes(): void {
	this.app.get("", this.handleRoot.bind(this))
        this.app.get("/login", this.login.bind(this));
	this.app.get("/dashboard", this.dashboard.bind(this));
    }

    private async handleRoot(c:Context) {
	const token = getCookie(c, 'authToken');
	if(token){
	    try {
	    	
	    } catch (e) {
	    	/* handle error */
	    }
	}
	return c.redirect('/login')

    }

    private async login(c: Context) {
        try {
            return c.html(<LoginPage/>);
        } catch (error) {
            return this.handleError(error, "Failed to serve home page", c);
        }
    }

    private async dashboard(c:Context) {
	try {
		
	} catch (error) {
	    return this.handleError(error, "Failed to serve Dashboard", c);
	}
    }
}
