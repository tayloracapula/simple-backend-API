import type { Context } from "hono";
import type { ConfigType, GeneralConfigType } from "hono-rate-limiter";

export function createRateLimiterConfig(): GeneralConfigType<ConfigType> {
    return {
        windowMs: 15 * 60 * 1000,
        limit: 100,
        standardHeaders: "draft-6",
        keyGenerator: (c: Context) => {
            const jwtPayload = c.get("roleJWT" as any);
            if (jwtPayload?.user_id) {
                return `user-${jwtPayload.user_id}`;
            }

            return (
                c.req.header("x-forwarded-for") ||
                c.req.header("x-real-ip") ||
                "unknown"
            );
        },
    };
}