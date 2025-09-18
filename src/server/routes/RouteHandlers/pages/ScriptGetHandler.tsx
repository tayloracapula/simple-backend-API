/** @jsx jsx */
/** @jsxImportSource hono/jsx */
import type { Hono, Context } from "hono";
import { RouteHandler } from "../RouteHandler";
import type { ViewScriptController } from "server/controllers/ViewScriptController";
import { getUserData } from "server/helpers/JWTDecode"
import { AdminHome } from "server/handlers/views/components/AdminHome";
import { ManagerHome } from "server/handlers/views/components/ManagerHome";
import { UserHome } from "server/handlers/views/components/UserHome";
import { NewBooking } from "server/handlers/views/components/NewBooking";
import { MyBookings } from "server/handlers/views/components/MyBookings";
import { TeamBookings } from "server/handlers/views/components/TeamBookings";
import { ManageBookings } from "server/handlers/views/components/ManageBookings";
import { AdminPortal } from "server/handlers/views/components/AdminPortal"; 


export class ScriptGetHandler extends RouteHandler {
    private viewScriptController: ViewScriptController
    constructor(app:Hono,viewScriptController:ViewScriptController) {
        super(app);
        this.viewScriptController = viewScriptController;
    }
    registerRoutes(): void {
	this.app.get("/fragment/dashboard/home", this.dashboardHome.bind(this))
        this.app.get("/fragment/dashboard/new-booking", this.newBooking.bind(this))
        this.app.get("/fragment/dashboard/my-bookings", this.myBookings.bind(this))
        this.app.get("/fragment/dashboard/team-bookings", this.teamBookings.bind(this))
        this.app.get("/fragment/dashboard/manage-bookings", this.manageBookings.bind(this))
        this.app.get("/fragment/dashboard/admin", this.adminPortal.bind(this))
    }

    private async dashboardHome(c:Context){
	try {
	    const user = await getUserData(c);
	    
	    if (user.role == 'Admin') {
		return c.html(<AdminHome userId={user.user_id}/>);    	
	    } else if (user.role == 'Manager') {
		return c.html(<ManagerHome userId={user.user_id}/>);
	    } else {
		return c.html(<UserHome userId={user.user_id}/>)
	    }

	} catch (error) {
	    return this.handleError(error,"Failed to load dashboard home", c)
	}
    }

    private async newBooking(c:Context){
	try {
	    const user = await getUserData(c);
	    return c.html(<NewBooking userId={user.user_id}/>)
	} catch (error) {
	    return this.handleError(error,"Failed to load dashboard New Booking", c)
	}
    }

    private async myBookings(c:Context){
	try {
	    const user = await getUserData(c);
	    return c.html(<MyBookings userId={user.user_id}/>)
	} catch (error) {
	    return this.handleError(error,"Failed to load dashboard New Booking", c)
	}
    }

    private async teamBookings(c:Context){
	try {
	    const user = await getUserData(c);
	    return c.html(<TeamBookings userId={user.user_id}/>)
	} catch (error) {
	    return this.handleError(error,"Failed to load dashboard Team Bookings", c)
	}
    }

    private async manageBookings(c:Context){
	try {
	    const user = await getUserData(c);
	    return c.html(<ManageBookings userId={user.user_id}/>)
	} catch (error) {
	    return this.handleError(error,"Failed to load dashboard Manage Bookings", c)
	}
    }

    private async adminPortal(c:Context){
	try {
	    const user = await getUserData(c);
	    return c.html(<AdminPortal userId={user.user_id}/>)
	} catch (error) {
	    return this.handleError(error,"Failed to load dashboard Admin Portal", c)
	}
    }
}
