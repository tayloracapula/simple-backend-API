import type { Context } from "hono";
import { StatusCode } from "server/StatusCodes";

export function parseID(c: Context):number {
    const userIdParam = c.req.param("id");
    if (!userIdParam) {
               throw new Error("ID is required");
    }
    const userId = parseInt(userIdParam, 10);
    if (isNaN(userId)) {
            throw new Error("ID must be a number")
    }
    return userId;
}
