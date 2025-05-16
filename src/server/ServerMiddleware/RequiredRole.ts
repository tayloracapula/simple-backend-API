import type { Context, Next } from "hono";
import { StatusCode } from "server/StatusCodes";

export function requiredRole(allowedRoles:string|string[]) {

    const roles = Array.isArray(allowedRoles)? allowedRoles: [allowedRoles];

    return async function roleMiddleware(c:Context, next:Next) {
        const jwtPayload = c.get('roleJWT');
        const userRole = jwtPayload?.role;

        if (!userRole || !roles.includes(userRole)) {
            return c.json({
                success:false,
                message: "Invalid permissons to access endpoint"
            },StatusCode.FORBIDDEN)
        }
        await next();
    }
}