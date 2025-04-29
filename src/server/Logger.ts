export class Logger {
    static info(message: string, ...data: any[]): void{
        console.log(`[INFO] ${new Date().toLocaleTimeString()} - ${message}`, ...data);
    }

    static warn(message: string, ...data: any[]): void{
        console.warn(`[WARNING] ${new Date().toLocaleTimeString()} - ${message}`, ...data);
    }

    static error(message: string, ...data: any[]): void{
        console.error(`[ERROR] ${new Date().toLocaleTimeString()} - ${message}`, ...data);
    }

    static debug(message: string, ...data: any[]): void{
        if (process.env.DEBUG === 'true') {
            console.debug(`[DEBUG] ${new Date().toLocaleTimeString()} - ${message}`, ...data);
        }
    }
}