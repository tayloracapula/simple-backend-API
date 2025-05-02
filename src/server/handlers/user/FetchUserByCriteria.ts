import { user } from "db-src/entity/entities/user";
import {
    ILike,
    type DataSource,
    type FindOptionsRelations,
    type FindOptionsWhere,
    type Repository,
} from "typeorm";
import {
    getRelationshipsForLevel,
    type UserRelationshipLevel,
} from "./UserRelationshipLevel";
import { Logger } from "server/Logger";
import type { UseCase } from "../UseCase";

export interface UserSearchCriteria {
    firstName?: string;
    lastName?: string;
    email?: string;
    roleName?: string;
    departmentName?: string;
}

export class FetchUserByCriteria implements UseCase {
    private repository: Repository<user>;
    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(user);
    }

    async execute(
        criteria: UserSearchCriteria,
        relationshipLevel: UserRelationshipLevel
    ) {
        try {
            const relations: FindOptionsRelations<user> =
                getRelationshipsForLevel(relationshipLevel);

            const buildConditions = (criteria: UserSearchCriteria) => {
                const conditions: FindOptionsWhere<user> = {};

                if (criteria.firstName)conditions.firstname = ILike(`%${criteria.firstName}%`);
                if (criteria.lastName)conditions.lastname = ILike(`%${criteria.lastName}%`);
                if (criteria.email)conditions.email = ILike(`%${criteria.email}%`);

                if (criteria.roleName)conditions.role = { role: ILike(`%${criteria.roleName}%`) };
                if (criteria.departmentName)conditions.department = {department: ILike(`%${criteria.departmentName}%`)};

                return conditions;
            };

            const users = await this.repository.find({
                where: buildConditions(criteria),
                relations: relations,
            });

            return {
                success: true,
                count: users.length,
                data: users,
            };
        } catch (error) {
            Logger.error("Failed to fetch users by criteria", error);
            throw error;
        }
    }
}
