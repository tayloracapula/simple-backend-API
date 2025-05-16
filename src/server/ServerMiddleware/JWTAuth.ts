import dotenv from 'dotenv';
import * as jose from 'jose'
import type { Context, Next} from 'hono';
import { StatusCode } from 'server/StatusCodes';

export async function JWTAuth(c:Context, next:Next) {
    const BEARER_PREFIX = 'Bearer '
    dotenv.config()
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    if (c.req.path.endsWith('/login')){
        await next();
    }

    const authHeader = c.req.header('Authorization');
    if (!authHeader||!authHeader.startsWith(BEARER_PREFIX)) {
       return c.json({
        success:false,
        message: "Authentication required"
       }, StatusCode.UNAUTHORISED)
    }

    const authToken = authHeader.substring(BEARER_PREFIX.length);

    try {
        const {payload} = await jose.jwtVerify(authToken,secret)
        c.set('roleJWT', payload)
        await next();
    } catch (error) {
        return c.json({
            success: false,
            message: "invalid or expired token"
        },StatusCode.UNAUTHORISED)
    }
}