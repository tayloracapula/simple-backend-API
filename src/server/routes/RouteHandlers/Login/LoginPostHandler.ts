import * as jose from "jose";
import dotenv from "dotenv";
import type { LoginController } from "server/controllers/LoginController";
import { RouteHandler } from "../RouteHandler";
import type { Context, Hono } from "hono";
import { parseLoginData } from "./ParseLoginData";
import { StatusCode } from "server/StatusCodes";

export class LoginPostHandler extends RouteHandler {
    private loginController: LoginController;
    constructor(app:Hono,loginController:LoginController) {
        super(app);
        this.loginController = loginController;
    }
    registerRoutes(): void {
        this.app.post("",this.login.bind(this))
    }

    private async login(c:Context){
        try {
            dotenv.config()
            const loginData = await c.req.json()

            if (!parseLoginData(loginData)) {
                return c.json({
                    success:false,
                    message: "Invalid email or password"
                },StatusCode.BAD_REQUEST)
            }
            const result = await this.loginController.verifyUser(loginData);

            const secret = new TextEncoder().encode(process.env.JWT_SECRET)
            const alg = 'HS256'
            const jwt =  await new jose.SignJWT(result)
                .setProtectedHeader({alg})
                .setIssuedAt()
                .setIssuer('leave-management:api')
                .setAudience('leave-management:frontend')
                .setExpirationTime('8h')
                .sign(secret)
            return c.json({
                success: true,
                jwt: jwt
            })
        } catch (error) {
            
        }
    }
}