import { IsNull, type DataSource, type Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { user } from "db-src/entity/entities/user";
import type { NewUserData } from "./NewUserData";
import { FetchRoleByCriteria } from "../role/FetchRoleByCriteria";
import { FetchDepartmentByCriteria } from "../department/FetchDepartmentByCriteria";
import { Logger } from "server/Logger";
import { PasswordHandler } from "../tools/PasswordHandler";
import { user_management } from "db-src/entity/entities/user_management";

export class EditUser implements UseCase {
    private userRepository: Repository<user>;
    private userManagementRepository: Repository<user_management>;
    private dataSource: DataSource;
    constructor(dataSource: DataSource) {
        this.userRepository = dataSource.getRepository(user);
        this.userManagementRepository =
            dataSource.getRepository(user_management);
        this.dataSource = dataSource;
    }

    async execute(updatedUserData: NewUserData & { id: number }) {
        try {
            const hashPromise = updatedUserData.password
                ? PasswordHandler.hashPassword(updatedUserData.password)
                : null;
            const rolePromise = updatedUserData.role
                ? new FetchRoleByCriteria(this.dataSource).execute(
                      updatedUserData.role
                  )
                : null;
            const departmentPromise = updatedUserData.department
                ? new FetchDepartmentByCriteria(this.dataSource).execute(
                      updatedUserData.department
                  )
                : null;

            const existingUser = await this.userRepository.findOne({
                where: { user_id: updatedUserData.id },
            });
            if (!existingUser) {
                throw new Error(
                    `User with id ${updatedUserData.id} does not exist`
                );  
            }

            if (updatedUserData.first_name) existingUser.firstname = updatedUserData.first_name;
            if (updatedUserData.last_name) existingUser.lastname = updatedUserData.last_name;
            if (updatedUserData.email) existingUser.email = updatedUserData.email;
            
            if (updatedUserData.managerID) await this.updateUserManager(existingUser,updatedUserData.managerID);

            if (rolePromise) existingUser.role = await rolePromise;
            if (departmentPromise) existingUser.department = await departmentPromise;
            if (hashPromise) existingUser.password = await hashPromise;

            this.userRepository.save(existingUser);

            return {
                success: true,
                message: "User updated successfully"
            }
        } catch (error) {
            Logger.error("Failed to edit User: ", error);
            throw error;
        }

    }

    private async updateUserManager(existingUser: user, newManagerID: number) {
            const activeManagement = await this.userManagementRepository.findOne({
                where:{
                    user: existingUser,
                    end_date: IsNull()
                 }
            });

            if (activeManagement) {
                activeManagement.end_date = new Date();
                await this.userManagementRepository.save(activeManagement);
            }

            const newManagement = new user_management()
            newManagement.user = existingUser;
            newManagement.start_date = new Date();
            newManagement.end_date = undefined;

            const newManager = await this.userRepository.findOne({
                where:{
                    user_id: newManagerID
                }
            })
            if (!newManager) {
                    throw new Error(`User with id ${newManagerID} does not exist`);  
            };
            newManagement.manager = newManager;

            await this.userManagementRepository.save(newManagement);
    }
}
