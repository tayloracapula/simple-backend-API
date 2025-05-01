import type { Context, Next } from "hono";
import { Logger } from "./Logger";
import { StatusCode } from "./StatusCodes";

export async function JSONValidate(c:Context, next:Next) {
    const method = c.req.method;
    if (method == 'POST' || method == 'PUT' || method == 'PATCH') {
        try {
            const bodyText = await c.req.text();

            if (bodyText.trim().length > 0) {
                if (!testJSON(bodyText)) {
                    Logger.warn(`Invalid JSON recieved: ${bodyText.substring(0,100)}...`);
                    return c.json({
                        success: false,
                        message: "Invalid JSON in request body"
                    },StatusCode.BAD_REQUEST);
                }
            }
        } catch (error) {
            Logger.error("Error processing request body", error);
            return c.json({
                success: false,
                message: "Error processing request body"
            },StatusCode.BAD_REQUEST)
        }
    }
    await next();
}

function testJSON(JSONString:string): boolean {
        try {
            const parsed = JSON.parse(JSONString);
            if (parsed && typeof parsed === "object") {
                return true
            }
        } catch (error) {
            return false;
        }
        return false;
}