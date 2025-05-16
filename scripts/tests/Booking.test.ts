import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { DataSource } from "typeorm";
import { LeaveBookingController } from "server/controllers/LeaveBookingController";
import path from "path";
import { leave_booking } from "db-src/entity/entities/leave_booking";
import { user } from "db-src/entity/entities/user";
import { department } from "db-src/entity/staticEntities/department";
import { role } from "db-src/entity/staticEntities/role";
import { user_management } from "db-src/entity/entities/user_management";
import { booking_type } from "db-src/entity/staticEntities/booking_type";
import { acceptance_status } from "db-src/entity/staticEntities/acceptance_status";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import type { NewUserData } from "server/handlers/user/NewUserData";
import { UserController } from "server/controllers/UserController";
import type { NewBookingData } from "server/handlers/leave_booking/NewBookingData";
import { UserRelationshipLevel } from "server/handlers/user/UserRelationshipLevel";

describe("Add Booking Implementation", () => {
    let dataSource: DataSource;
    let userController: UserController;
    let leaveBookingController: LeaveBookingController;

    beforeAll(async () => {
        const testDbPath = path.join(process.cwd(), "testBooking.sqlite");
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

        await dataSource
            .getRepository(acceptance_status)
            .save([
                { status: "Accepted" },
                { status: "Refused" },
                { status: "Pending" },
                { status: "Cancelled" },
            ]);

        await dataSource
            .getRepository(booking_type)
            .save([
                { booking_type: "Annual_Leave" },
                { booking_type: "Sick_Leave" },
                { booking_type: "Voulenteer_Days" },
                { booking_type: "Unpaid_Leave" },
            ]);
        userController = new UserController(dataSource);
        leaveBookingController = new LeaveBookingController(dataSource);
    });
    afterAll(async () => {
        if (dataSource && dataSource.isInitialized) {
            await dataSource.destroy();
        }
        const testDbPath = path.join(process.cwd(), "testBooking.sqlite");
        await Bun.file(testDbPath).delete();
    });
    it("Test 1: Should create users and a new booking", async () => {
        const testManagerData: NewUserData = {
            first_name: "Test",
            last_name: "Manager",
            email: "test.manager@example.com",
            password: "Password123!",
            role: "Manager",
            department: "testingDept",
        };
        await userController.addNewUser(testManagerData);
        const testUserData: NewUserData = {
            first_name: "Test",
            last_name: "User",
            email: "test.user@example.com",
            password: "Password123!",
            role: "User",
            department: "testingDept",
            managerID: 1,
        };
        await userController.addNewUser(testUserData);

        const testBooking: NewBookingData = {
            start_date: new Date("2035-05-15"),
            end_date: new Date("2035-05-25"),
            user_id: 2,
            booking_type: "Annual_Leave",
        };

        const bookingResult = await leaveBookingController.addBooking(
            testBooking
        );
        const userWithBooking = await userController.fetchUserByCriteria(
            { id: 2 },
            UserRelationshipLevel.STANDARDWBOOKINGS
        );
        expect(bookingResult.success).toBe(true);
        expect(userWithBooking.data[0].annual_leave_balance).toBe(16);
    });

    it('Test 2: Should refuse booking request', async () => {
        const bookingList = await leaveBookingController.fetchManagerPendingBooking(1);
        expect(bookingList.count).toBe(1);
        expect(bookingList.data[0].status.status).toBe("Pending");

        const refuseBooking = await leaveBookingController.approveDenyBooking(1,false)
        expect(refuseBooking.success).toBe(true);
        expect(refuseBooking.data.status.status).toBe("Refused");
    });

    it('Test 3: Should accept booking request', async () => {
        const bookingList = await leaveBookingController.fetchUserBookings(2);
        expect(bookingList.count).toBe(1);

        const acceptBooking = await leaveBookingController.approveDenyBooking(1,true);
        expect(acceptBooking.success).toBe(true);
        expect(acceptBooking.data.status.status).toBe("Accepted");
    });

    it('Test 4: Should cancel booking request',async () => {
        const bookingList = await leaveBookingController.fetchUserBookings(2);
        expect(bookingList.count).toBe(1);
        
        const cancelBooking = await leaveBookingController.cancelBooking(1);
        expect(cancelBooking.success).toBe(true)
        expect(cancelBooking.data.status.status).toBe("Cancelled");
    });

    it('Test 5: Should reject booking with start date before end date', async () => {
        
        const invalidBooking: NewBookingData = {
            start_date: new Date("2035-05-25"),
            end_date: new Date("2035-5-15"),
            user_id: 2,
            booking_type: "Annual_Leave"
        }

        try {
            await leaveBookingController.addBooking(invalidBooking);
            expect(true).toBe(false);
        } catch (error) {
            expect((error as Error).message).toContain("date");
        }
    });

    it('Test 6: Should reject booking exceeding available leave balance', async () => {
        
        const tooLongBooking: NewBookingData = {
            start_date: new Date("2035-06-01"),
            end_date: new Date("2035-07-15"),
            user_id: 2,
            booking_type: "Annual_Leave"
        };

        try {
            await leaveBookingController.addBooking(tooLongBooking)
            expect(true).toBe(false)
        } catch (error) {
            expect((error as Error).message).toContain("Insuficcient")
        }
    })
});
