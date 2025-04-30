import path from "path";
import fs from "fs"
export class Logger {

    private static logDir = path.join(process.cwd(), 'logs');

    private static ensureLogDirExists(): void {
        if (!fs.existsSync(this.logDir)) {
         fs.mkdirSync(this.logDir,{recursive:true});   
        }
    }

    static info(message: string, ...data: any[]): void{
        console.log(`[INFO] ${new Date().toLocaleTimeString()} - ${message}`, ...data);
    }

    static warn(message: string, ...data: any[]): void{
        console.warn(`[WARNING] ${new Date().toLocaleTimeString()} - ${message}`, ...data);
    }

    static error(message: string, ...data: any[]): void{
        console.error(`[ERROR] ${new Date().toLocaleTimeString()} - ${message}`, ...data);
        this.ensureLogDirExists();
        const now = new Date();
        const logFile = path.join(this.logDir, `errors.log`);

        const logEntry = `[ERROR] ${now.toISOString()} - ${message} ${data.length ? JSON.stringify(data,null,2) : ''}\n`

        fs.appendFile(logFile,logEntry, (err) => {
            if (err) {
                console.error(`[META-ERROR] Failed to write error log: ${err.message}`)   
            }
        })
    }

    static debug(message: string, ...data: any[]): void{
        if (process.env.DEBUG === 'true') {
            console.debug(`[DEBUG] ${new Date().toLocaleTimeString()} - ${message}`, ...data);
        }
    }
}