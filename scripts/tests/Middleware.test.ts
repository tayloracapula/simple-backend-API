import { beforeAll, describe, expect, it, mock } from "bun:test";
import * as jose from "jose";
import dotenv from "dotenv";
import { JWTAuth } from "server/ServerMiddleware/JWTAuth";
import { StatusCode } from "server/StatusCodes";
import { requiredRole } from "server/ServerMiddleware/RequiredRole";
import { JSONValidate } from "server/ServerMiddleware/JSONValidate";

describe("Middleware tests", () => {
    let validToken: string;
    let expiredToken: string;
    let validJson: string;
    let invalidJson: string;

    beforeAll(async () => {
        dotenv.config();
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        validToken = await new jose.SignJWT({ role: "Admin", user_id: 1 })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setIssuer("leave-management:api")
            .setAudience("leave-management:frontend")
            .setExpirationTime("1h")
            .sign(secret);

        expiredToken = await new jose.SignJWT({ role: "User", user_id: 2 })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setIssuer("leave-management:api")
            .setAudience("leave-management:frontend")
            .setExpirationTime("-1h")
            .sign(secret);

        validJson = JSON.stringify({
            user_id: 123,
            first_name: "Alex",
            last_name: "Johnson",
            email: "alex.johnson@example.com",
        });

        invalidJson = `{
            "user_id": 123
            "email": "broken@example.com"
        }`;
    });

    describe("JWTAuth testing", () => {
        it("Test 1: should allow requests to login without token", async () => {
            const mockJson = mock(() => {});
            const mockSet = mock(() => {});
            const context = {
                req: {
                    path: "/api/login",
                    header: () => null,
                },
                json: mockJson,
                set: mockSet,
            };
            const next = mock(async () => {});

            await JWTAuth(context as any, next as any);

            expect(next).toHaveBeenCalled();
        });

        it("Test 2: should reject requests lacking an Authorisation header", async () => {
            const mockJson = mock(() => {});
            const mockSet = mock(() => {});
            const context = {
                req: {
                    path: "/api/admin/users",
                    header: () => null,
                },
                json: mockJson,
                set: mockSet,
            };
            const next = mock(async () => {});

            await JWTAuth(context as any, next as any);

            expect(next).not.toHaveBeenCalled();
            expect(mockJson).toHaveBeenCalledWith(
                {
                    success: false,
                    message: "Authentication required",
                },
                StatusCode.UNAUTHORISED
            );
        });

        it("Test 3: should accept valid token", async () => {
            const mockJson = mock(() => {});
            const mockSet = mock(() => {});
            const context = {
                req: {
                    path: "/api/admin/users",
                    header: () => `Bearer ${validToken}`,
                },
                json: mockJson,
                set: mockSet,
            };
            const next = mock(async () => {});

            await JWTAuth(context as any, next as any);
            expect(mockSet).toHaveBeenCalled();
            expect(next).toHaveBeenCalled();
            expect(mockJson).not.toHaveBeenCalled();
        });

        it("Test 4: should reject invalid token", async () => {
            const mockJson = mock(() => {});
            const mockSet = mock(() => {});
            const context = {
                req: {
                    path: "/api/admin/users",
                    header: () => `Bearer ${expiredToken}`,
                },
                json: mockJson,
                set: mockSet,
            };
            const next = mock(async () => {});

            await JWTAuth(context as any, next as any);
            expect(mockJson).toHaveBeenCalledWith(
                {
                    success: false,
                    message: "invalid or expired token",
                },
                StatusCode.UNAUTHORISED
            );
        });
    });

    describe("RequiredRole testing", () => {
        it("Test 1: Should allow access when the user has correct role", async () => {
            const mockJson = mock(() => {});
            const context = {
                get: () => ({ role: "Admin" }),
                json: mockJson,
            };
            const next = mock(async () => {});

            const middleware = requiredRole("Admin");
            await middleware(context as any, next);

            expect(next).toHaveBeenCalled();
        });

        it("Test 2: Should allow access when the user has one of correct role", async () => {
            const mockJson = mock(() => {});
            const context = {
                get: () => ({ role: "Manager" }),
                json: mockJson,
            };
            const next = mock(async () => {});

            const middleware = requiredRole(["Admin", "Manager"]);
            await middleware(context as any, next);

            expect(next).toHaveBeenCalled();
        });

        it("Test 2: Should allow access when the user has one of correct role", async () => {
            const mockJson = mock(() => {});
            const context = {
                get: () => ({ role: "User" }),
                json: mockJson,
            };
            const next = mock(async () => {});

            const middleware = requiredRole(["Admin", "Manager"]);
            await middleware(context as any, next);

            expect(next).not.toHaveBeenCalled();
            expect(mockJson).toHaveBeenCalledWith(
                {
                    success: false,
                    message: "Invalid permissons to access endpoint",
                },
                StatusCode.FORBIDDEN
            );
        });
    });

    describe("JSONValidate testing", () => {
        it("Test 1: Should accept valid JSON on POST", async () => {
            const mockJson = mock(() => {});
            const context = {
                req: {
                    method: "POST",
                    text: async () => validJson,
                },
                json: mockJson,
            };
            const next = mock(async () => {});

            await JSONValidate(context as any, next);

            expect(next).toHaveBeenCalled();
        });

        it("Test 2: Should reject invalid JSON on POST", async () => {
            const mockJson = mock(() => {});
            const context = {
                req: {
                    method: "POST",
                    text: async () => invalidJson,
                },
                json: mockJson,
            };
            const next = mock(async () => {});

            await JSONValidate(context as any, next);

            expect(next).not.toHaveBeenCalled();
            expect(mockJson).toHaveBeenCalledWith(
                {
                    success: false,
                    message: "Invalid JSON in request body",
                },
                StatusCode.BAD_REQUEST
            );
        });
    });
});
