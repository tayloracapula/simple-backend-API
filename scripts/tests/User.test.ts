import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { leave_booking } from "db-src/entity/entities/leave_booking";
import { user } from "db-src/entity/entities/user";
import { department } from "db-src/entity/staticEntities/department";
import { role } from "db-src/entity/staticEntities/role";
import { UserController } from "server/controllers/UserController";
import type { NewUserData } from "server/handlers/user/NewUserData";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import "reflect-metadata";
import path from "path";
import { user_management } from "db-src/entity/entities/user_management";
import { booking_type } from "db-src/entity/staticEntities/booking_type";
import { acceptance_status } from "db-src/entity/staticEntities/acceptance_status";

describe("User Creation Implementation", () => {
    let dataSource: DataSource;
    let userController: UserController;
    beforeAll(async () => {
        const testDbPath = path.join(process.cwd(), "testUser.sqlite");
        dataSource = new DataSource({
            type: "sqlite",
            database: testDbPath,
            entities: [
                user,
                leave_booking,
                user_management,
                acceptance_status,
                booking_type,
                department,
                role,
            ],
            synchronize: true,
            logging: false,
            namingStrategy: new SnakeNamingStrategy(),
            migrations: [],
            migrationsRun: false,
            cache: false,
        });

        await dataSource.initialize();

        await dataSource
            .getRepository(role)
            .save([{ role: "Manager" }, { role: "User" }]);

        await dataSource
            .getRepository(department)
            .save([{ department: "testingDept" }]);

        userController = new UserController(dataSource);
    });

    afterAll(async () => {
        if (dataSource && dataSource.isInitialized) {
            await dataSource.destroy();
        }
        const testDbPath = path.join(process.cwd(), "testUser.sqlite");
        await Bun.file(testDbPath).delete();
    });

    it("Test 1: Should fail to create a new user", async () => {
        const failUserData: NewUserData = {
            first_name: "Fail",
            last_name: "User",
            email: "test.user@example.com",
            password: "Password123!",
            role: "User",
            department: "testingDept",
        };

        try {
            const result = await userController.addNewUser(failUserData);
    
            expect(true).toBe(false);
        } catch (error) {
           expect(error).toBeDefined();
           expect((error as Error).message).toContain("manager") 
        }
    });

    it("Test 2: Should create a new manager", async () => {
        const testManagerData: NewUserData = {
            first_name: "Test",
            last_name: "Manager",
            email: "test.manager@example.com",
            password: "Password123!",
            role: "Manager",
            department: "testingDept",
        };

        const result = await userController.addNewUser(testManagerData);

        expect(result.success).toBe(true);
        expect(result.data.user_id).toBeDefined();
        expect(result.message).toContain("User Created");
    });

    it("Test 3: Should create a new user", async () => {
        const passUserData: NewUserData = {
            first_name: "Test",
            last_name: "User",
            email: "test.user@example.com",
            password: "Password123!",
            role: "User",
            department: "testingDept",
            managerID: 1,
        };

        const result = await userController.addNewUser(passUserData);

        expect(result.success).toBe(true);
        expect(result.data.user_id).toBeDefined();

    });

    it("Test 4: Should reject a duplicate email", async () => {
        const duplicateUserData: NewUserData = {
            first_name: "Test",
            last_name: "User",
            email: "test.user@example.com",
            password: "Password123!",
            role: "User",
            department: "testingDept",
            managerID: 1,
        };

        try {
            const result = await userController.addNewUser(duplicateUserData);
            expect(true).toBe(false);
        } catch (error) {
            expect(error).toBeDefined();
            expect((error as Error).message).toContain("email");
        }
    });
});
