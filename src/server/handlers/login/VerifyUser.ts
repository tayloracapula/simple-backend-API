import { ILike, type DataSource, type Repository } from "typeorm";
import type { UseCase } from "../UseCase";
import { user } from "db-src/entity/entities/user";
import type { LoginData } from "./LoginData";
import { Logger } from "server/Logger";
import { PasswordHandler } from "../tools/PasswordHandler";

export class VerifyUser implements UseCase{
    private userRepository: Repository<user>
    constructor(dataSource:DataSource) {
        this.userRepository = dataSource.getRepository(user);
    }

    async execute(loginData:LoginData){
        try {
            const user = await this.userRepository.findOne({
                where:{email: ILike(loginData.email)},
                relations: { role: true }
            })
            if (!user) {
                return{
                    success: false,
                    message: "Invalid User Email"
                }
            }

            const correctPassword = await PasswordHandler.verifyPassword(loginData.password,user.password)

            if (correctPassword) {
                return {
                    user_id: user.user_id,
                    role: user.role.role,
                }
            }else{
                return{
                    success: false,
                    message: "Invalid User Password"
                }
            }
        } catch (error) {
            Logger.error("Failed to process login",error)
            throw error;
        }
    }
}