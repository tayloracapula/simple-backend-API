import type { DataSource, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { user } from "db-src/entity/entities/user";
import { PasswordHandler } from "../tools/PasswordHandler";
import { user_management } from "db-src/entity/entities/user_management";
import { FetchRoleByCriteria } from "../role/FetchRoleByCriteria";
import { FetchDepartmentByCriteria } from "../department/DepartmentUseCaseIndex";
import { FetchUserByCriteria } from "./FetchUserByCriteria";
import { UserRelationshipLevel } from "./UserRelationshipLevel";
import { Logger } from "server/Logger";



export interface NewUserData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
    department: string;
    /**Optional Field: if omitted and role is "manager" then the user will be marked to manage themselves otherwise it will return an error*/
    managerID: number; //
}

export class RegisterNewUser implements UseCase {
    private dataSource: DataSource;
    private userRepository: Repository<user>;
    private userManagementRepository: Repository<user_management>
    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
        this.userRepository = dataSource.getRepository(user);
        this.userManagementRepository = dataSource.getRepository(user_management);
    }

    async execute(userData:NewUserData) {
        try {
            const rolePromiser = new FetchRoleByCriteria(this.dataSource);
            const departmentPromiser = new FetchDepartmentByCriteria(this.dataSource);
            const managerPromiser =  userData.managerID ? new FetchUserByCriteria(this.dataSource): null;
            Logger.debug("beggining user entry")
            const hashPromise = PasswordHandler.hashPassword(userData.password);
            const rolePromise = rolePromiser.execute(userData.role);
            const departmentPromise = departmentPromiser.execute(userData.department);
            const managerPromise = managerPromiser ? managerPromiser.execute({id:userData.managerID},UserRelationshipLevel.BASIC): null;
    
            const newUser = new user();
            const newUserManagement = new user_management();
    
            newUser.firstname = userData.first_name;
            newUser.lastname = userData.last_name;
            newUser.email = userData.email;
            newUserManagement.user = newUser;
            newUserManagement.start_date = new Date();
            newUserManagement.end_date = undefined;

            newUser.role = await rolePromise;
            newUser.department = await departmentPromise;
            if (userData.role === "Manager" && !userData.managerID) {
                newUserManagement.manager = newUser;
            }else if (!userData.managerID && userData.role != "Manager") {
                throw new Error("User must be a manager to manage themselves");
            }else{
                const managerResult = await managerPromise;
                if (!managerResult||managerResult.data.length === 0) {
                    throw new Error("Manager lookup failed  manager not found with id: "+ userData.managerID)
                }
                newUserManagement.manager = managerResult.data[0];
            }
    
            newUser.password = await hashPromise;
            
            return await this.dataSource.transaction(async transactionManager =>{
                await transactionManager.save(newUser);
                await transactionManager.save(newUserManagement);
                return {
                    success: true,
                    message: "User Created Successfully",
                    data: newUser
                };
           });

        } catch (error) {
           Logger.error("Failed to add new user",error);
           throw error; 
        }
    }
}
