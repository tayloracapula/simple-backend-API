import type { LoginData } from "server/handlers/login/LoginData";
import { VerifyUser } from "server/handlers/login/VerifyUser";
import type { DataSource } from "typeorm";

export class LoginController {
    private dataSource:DataSource
    constructor(dataSource:DataSource) {
        this.dataSource = dataSource;
    }

    async verifyUser(loginData:LoginData){
        const userVerifyer = new VerifyUser(this.dataSource);
        return await userVerifyer.execute(loginData);
    }
}