import type { LoginData } from "server/handlers/login/LoginData";

export function parseLoginData(data:any):data is LoginData {
    return typeof data === 'object' && 
        data !== null && 
        typeof data.email  === 'string' &&
        typeof data.password === 'string';
}