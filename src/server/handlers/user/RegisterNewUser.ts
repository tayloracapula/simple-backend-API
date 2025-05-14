import type { DataSource } from "typeorm";
import type { UseCase } from "../UseCase";
import { user } from "db-src/entity/entities/user";
import { PasswordHandler } from "../tools/PasswordHandler";
import { user_management } from "db-src/entity/entities/user_management";
import { FetchRoleByCriteria } from "../role/FetchRoleByCriteria";
import { FetchDepartmentByCriteria } from "../department/DepartmentUseCaseIndex";
import { FetchUserByCriteria } from "./FetchUserByCriteria";
import { UserRelationshipLevel } from "./UserRelationshipLevel";
import { Logger } from "server/Logger";
import type { NewUserData } from "./NewUserData";



export class RegisterNewUser implements UseCase {
    private dataSource: DataSource;
    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    async execute(userData:NewUserData) {
        try {
            this.validateUserData(userData); 

            const roleFetcher = new FetchRoleByCriteria(this.dataSource);
            const departmentFetcher = new FetchDepartmentByCriteria(this.dataSource);
            const managerFetcher =  userData.managerID ? new FetchUserByCriteria(this.dataSource): null;

            Logger.debug("beginning user entry")
            const hashPromise = PasswordHandler.hashPassword(userData.password!);
            const rolePromise = roleFetcher.execute(userData.role!);
            const departmentPromise = departmentFetcher.execute(userData.department!);
            const managerPromise = managerFetcher ? managerFetcher.execute({id:userData.managerID},UserRelationshipLevel.BASIC): null;
    
            const newUser = new user();
            const newUserManagement = new user_management();
    
            newUser.firstname = userData.first_name!;
            newUser.lastname = userData.last_name!;
            newUser.email = userData.email!;
            newUserManagement.user = newUser;
            newUserManagement.start_date = new Date();
            newUserManagement.end_date = undefined;

            newUser.role = await rolePromise;
            newUser.department = await departmentPromise;


            if ((userData.role === "Manager"|| userData.role === "Admin") && !userData.managerID) {
                newUserManagement.manager = newUser;
            }else if (!userData.managerID && userData.role != "Manager") {
                throw new Error("User must be a manager to manage themselves");
            }else{
                const managerResult = await managerPromise;
                if (!managerResult||managerResult.count === 0) {
                    throw new Error(`Manager lookup failed  manager not found with id: ${userData.managerID} `)
                }
                newUserManagement.manager = managerResult.data[0];
            }
    
            newUser.password = await hashPromise;
            
            return await this.dataSource.transaction(async transactionManager =>{
                await transactionManager.save(newUser);
                await transactionManager.save(newUserManagement);

                const safeUser = {...newUser};
                safeUser.password = `#`.repeat(newUser.password.length);
                return {
                    success: true,
                    message: "User Created Successfully",
                    data: safeUser
                };
           });

        } catch (error) {
           Logger.error("Failed to add new user",error);
           throw error; 
        }
    }

    private validateUserData(userData: NewUserData): void {
            if (!userData.first_name) throw new Error("First name is required");
            if (!userData.last_name) throw new Error("Last name is required");
            if (!userData.email) throw new Error("Email is required");
            if (!userData.password) throw new Error("Password is required");
            if (!userData.role) throw new Error("Role is required");
            if (!userData.department) throw new Error("Department is required");
    }
}
