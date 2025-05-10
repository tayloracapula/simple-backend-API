import { In, type DataSource, type Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { Logger } from "server/Logger";
import { FetchUserByCriteria } from "../user/FetchUserByCriteria";
import { UserRelationshipLevel } from "../user/UserRelationshipLevel";
import { leave_booking } from "db-src/entity/entities/leave_booking";
import { booking_type } from "db-src/entity/staticEntities/booking_type";

export class FetchManagerPendingBookings implements UseCase {
    private dataSource: DataSource;
    private repository: Repository<leave_booking>
    constructor(dataSource:DataSource) {
        this.dataSource = dataSource;
        this.repository = dataSource.getRepository(leave_booking);
    }

    async execute(managerId:number){
        try {
            const managerFetcher = new FetchUserByCriteria(this.dataSource)

            const managerResult = await managerFetcher.execute({id:managerId},UserRelationshipLevel.MANAGEMENT);
            if (!managerResult||managerResult.count === 0 ) {
                throw new Error(`Manager Lookup failed user not found with id: ${managerId}`);
            }

            const manager = managerResult.data[0];

            if (!manager.managed_employees || manager.managed_employees.length === 0) {
                Logger.debug(`Manager ${managerId} has no employees`);
                return {
                    success: true,
                    count: 0,
                    data: []
                };
            }
            

            const employeeIds = manager.managed_employees.map(relation =>
                relation.user.user_id
            );

            const pendingBookings = await this.repository.find({
                where:{
                    user:{user_id: In(employeeIds)},
                    status:{status: "Pending"}
                },
                relations: ["user","booking_type","status"]
            });

            return{
                success: true,
                count: pendingBookings.length,
                data: pendingBookings
            }


        } catch (error) {
            Logger.error("Failed to retrieve pending bookings", error);
            throw error;
        }
    }
}