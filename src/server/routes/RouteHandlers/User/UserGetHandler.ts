import type { Context, Hono } from "hono";
import { RouteHandler } from "../RouteHandler";
import { UserRelationshipLevel, getRelationshipLevelFromString } from "server/handlers/user/UserRelationshipLevel";
import { UserController } from "server/controllers/UserController";
import type { UserSearchCriteria } from "server/handlers/user/FetchUserByCriteria";
import { StatusCode } from "server/StatusCodes";

export class UserGetRouteHandler extends RouteHandler{
    private userController: UserController
    constructor(app:Hono,userController: UserController){
        super(app)
        this.userController = userController;
    }
    registerRoutes(): void {
        this.app.get("/users",this.getUsers.bind(this));
        this.app.get("/search-users",this.searchUsers.bind(this))
    }

    private async getUsers(c:Context) {
        try {
            const levelString = c.req.query('relationship-level') 
            if (!levelString) throw new Error("parameter 'relationship-level is required'");
            
            const level:UserRelationshipLevel = getRelationshipLevelFromString(levelString)
            const result = await this.userController.getAllUsers(level);

            return c.json(result,StatusCode.OK)
        } catch (error) {
            return this.handleError(error,"Failed to retrieve Users",c) 
        }
    }

    private async searchUsers(c:Context) {
            try {
                const searchCriteria:UserSearchCriteria ={
                    firstName: c.req.query('first-name'),
                    lastName: c.req.query('last-name'),
                    email: c.req.query('email'),
                    roleName: c.req.query('role-name'),
                    departmentName: c.req.query('department-name'),
                }
                
                const level = (c.req.query('level') as UserRelationshipLevel || UserRelationshipLevel.STANDARD);
                const result = await this.userController.getUserByCondition(searchCriteria,level);

                return c.json(result,StatusCode.OK);

            } catch (error) {
               return this.handleError(error,"Failed to search users",c)
            }
    }

}