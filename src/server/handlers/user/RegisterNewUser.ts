import type { DataSource, Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { user } from "db-src/entity/entities/user";
import { PasswordHandler } from "../tools/PasswordHandler";
import { user_management } from "db-src/entity/entities/user_management";
import { FetchRoleByCriteria } from "../role/FetchRoleByCriteria";
import { FetchDepartmentByCriteria } from "../department/DepartmentUseCaseIndex";



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
        const rolePromiser = new FetchRoleByCriteria(this.dataSource);
        const departmentPromiser = new FetchDepartmentByCriteria(this.dataSource);
        const hashPromise = PasswordHandler.hashPassword(userData.password);
        const rolePromise = rolePromiser.execute(userData.role);
        const departmentPromise = departmentPromiser.execute(userData.department);

        const newUser = new user();
        const newUserManagement = new user_management();

        newUser.firstname = userData.first_name;
        newUser.lastname = userData.last_name;
        newUser.email = userData.email;
        newUser.role = await rolePromise;
        newUser.department = await departmentPromise;
        newUserManagement.user = newUser;
        newUserManagement.start_date = new Date();
        if (userData.role === "Manager" && !userData.managerID) {
            newUserManagement.manager = newUser;


        }

        newUser.password = await hashPromise;
    }
}
