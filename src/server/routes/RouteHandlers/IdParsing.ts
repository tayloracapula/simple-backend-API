import type { Context } from "hono";

export function parseID(c: Context): number {
    const IdParam = c.req.query("id");
    if (!IdParam) {
        throw new Error("ID is required");
    }
    const Id = parseInt(IdParam, 10);
    if (isNaN(Id)) {
        throw new Error("ID must be a number");
    }
    return Id;
}
