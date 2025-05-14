
export class PasswordHandler {

    static async hashPassword(password:string):Promise<string>{
        const hash = Bun.password.hash(password,{
            algorithm:"argon2id",
            memoryCost:50,
            timeCost: 10,
        });
        
        return hash;
    }

    static async verifyPassword(password:string, hash:string):Promise<boolean>{
        const isMatch = Bun.password.verify(password,hash)

        return isMatch;
    }
}