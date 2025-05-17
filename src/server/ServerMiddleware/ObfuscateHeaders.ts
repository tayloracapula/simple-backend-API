import type { Context, Next } from "hono";

export async function obfuscareHeaders(c:Context,next:Next) {
    await next();

    c.header('Server','Leave-Booking');
    c.header('X-Powered-By',undefined);

    c.header('X-Content-Type-Options','nosniff')
}