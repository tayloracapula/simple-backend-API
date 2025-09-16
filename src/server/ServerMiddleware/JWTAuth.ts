import dotenv from 'dotenv';
import * as jose from 'jose'
import type { Context, Next} from 'hono';
import { getCookie,deleteCookie } from 'hono/cookie';
import { StatusCode } from 'server/StatusCodes';

const PUBLIC_ROUTES = [
    '/',
    '/login',
    '/static/*',
    '/api/login'

]

function isPublicRoute(path:string):boolean {
    return PUBLIC_ROUTES.some(pattern => {
        if (pattern === path) {
           return true; 
        }
        if (pattern.endsWith('/*')){
            const prefix = pattern.slice(0,-1)
            return path.startsWith(prefix);
        }
        return false;
    })
}

export async function JWTAuth(c:Context, next:Next) {
    const BEARER_PREFIX = 'Bearer '
    dotenv.config()
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    if (isPublicRoute(c.req.path)) {
        await next();
    }

    const authHeader = c.req.header('Authorization');
    let authToken:string|undefined = undefined

    if (authHeader && authHeader.startsWith(BEARER_PREFIX)) {
	authToken = authHeader.substring(BEARER_PREFIX.length);
    }else{
	authToken = getCookie(c, 'authToken')
    }

    if (!authToken) {
	const acceptHeader = c.req.header('accept') || '';
	const isPageRequest = acceptHeader.includes('text/html');
	if (isPageRequest) {
	    return c.redirect('/login?error=no-session')
	} else{
	    return c.json({
		success:false,
		message: "Authentication required"
	    }, StatusCode.UNAUTHORISED)
	}
    }


    try {
        const {payload} = await jose.jwtVerify(authToken,secret)
        c.set('roleJWT', payload)
        await next();
    } catch (error) {
	const acceptHeader = c.req.header('accept') || '';
	const isPageRequest = acceptHeader.includes('text/html');
	if (isPageRequest){
	    deleteCookie(c, 'authToken');
	    return c.redirect('/login?error=no-session')
	}else{
	    return c.json({
		success: false,
		message: "invalid or expired token"
	    },StatusCode.UNAUTHORISED)
	}
    }
}
