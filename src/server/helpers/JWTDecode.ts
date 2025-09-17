import * as jose from "jose";
import type {JWTPayload} from "jose"
import type {Context} from "hono"
import { getCookie } from "hono/cookie";

export interface Payload extends JWTPayload{
    userfirstname: string,
    userlastname: string,
    user_id: number,
    role: string,
}

export async function JWTDecode(c:Context): Promise<Payload>{
    try {
	const BEARER_PREFIX = 'Bearer '
	const authHeader = c.req.header('Authorization')
	let token:string | undefined;
	if (authHeader?.startsWith(BEARER_PREFIX)) {
	    token = authHeader.substring(BEARER_PREFIX.length);
	}else {
	    token = getCookie(c, 'authToken');
	}

	if(!token){
	    throw new Error("authToken not present")
	}	
	const secret = new TextEncoder().encode(process.env.JWT_SECRET);
	const {payload} = await jose.jwtVerify(token,secret)
	return payload as Payload;

    } catch (error) {
	throw new Error(`${error}`)
    }
}

export async function getUserData(c:Context){
    try {
	const payload = await JWTDecode(c);
	return {
	    userfirstname: payload.userfirstname,
	    userlastname: payload.userlastname,
	    user_id: payload.user_id,
	    role: payload.role,
	}
    }catch(error){
	throw new Error(`${error}`)
    }
}
