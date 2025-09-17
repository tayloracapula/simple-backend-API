/** @jsx jsx */
/** @jsxImportSource hono/jsx */
import * as jose from "jose";
import type { Context, Hono } from "hono";
import { getCookie, deleteCookie } from "hono/cookie";
import { RouteHandler } from "../RouteHandler";
import { LoginPage } from "server/handlers/views/pages/LoginPage";
import { Dashboard } from "server/handlers/views/pages/Dashboard";
import { getUserData } from "server/helpers/JWTDecode"

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
		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		await jose.jwtVerify(token,secret);
		return c.redirect('/dashboard');
	    } catch (error) {
		deleteCookie(c,'authToken')
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
	    let user = await getUserData(c)
	    return c.html(<Dashboard
		userId={user.user_id}
		userFirstname={user.userfirstname}
		userLastname={user.userlastname}
		userRole={user.role as 'user' | 'manager' | 'admin'}
	    />)
		
	} catch (error) {
	    return this.handleError(error, "Failed to serve Dashboard", c);
	}
    }
}
