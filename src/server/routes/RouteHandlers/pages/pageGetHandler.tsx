/** @jsx jsx */
/** @jsxImportSource hono/jsx */
import * as jose from "jose";
import type { Context, Hono } from "hono";
import { getCookie, deleteCookie } from "hono/cookie";
import { RouteHandler } from "../RouteHandler";
import { LoginPage } from "server/handlers/views/pages/LoginPage";
import { Dashboard } from "server/handlers/views/pages/Dashboard";
import { getUserData } from "server/helpers/JWTDecode"
import { Logger } from "server/Logger";

export class PageGetHandler extends RouteHandler {
    constructor(app: Hono) {
        super(app);
    }
    registerRoutes(): void {
	const dashboardPaths:string[] = [
	    "/dashboard",
	    "/dashboard/home",
	    "/dashboard/new-booking",
	    "/dashboard/my-bookings",
	    "/dashboard/team-bookings",
	    "/dashboard/manage-bookings",
	    "/dashboard/admin"
	]
	this.app.get("", this.handleRoot.bind(this))
        this.app.get("/login", this.login.bind(this));

	dashboardPaths.forEach(route => {
	    this.app.get(route, this.dashboard.bind(this));
	})
    }

    private async handleRoot(c:Context) {
	const token = getCookie(c, 'authToken');
	if(token){
	    try {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		await jose.jwtVerify(token,secret);
		Logger.debug('cookie verified redirecting')
		return c.redirect('/dashboard');
	    } catch (error) {
		Logger.debug('deleting cookie')
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
	    Logger.debug(`${JSON.stringify(user)}`)
	    return c.html(<Dashboard
		userId={user.user_id}
		userFirstname={user.userfirstname}
		userLastname={user.userlastname}
		userRole={user.role as 'User' | 'Manager' | 'Admin'}
		currentPath={c.req.path}
	    />)
		
	} catch (error) {
	    return this.handleError(error, "Failed to serve Dashboard", c);
	}
    }
}
