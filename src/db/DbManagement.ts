import { Database } from "bun:sqlite";
import fs from "fs";
import path from "path";
//import { user_management } from "./entity/entities/user_management";
//import { user } from "./entity/entities/user.ts";
//import { department } from "./entity/staticEntities/department";
//import { role } from "./entity/staticEntities/role";
import { createAppDataSource } from "data-source";
import type { DataSource } from "typeorm";

export class DatabaseManager {
    private dbPath: string;
    dbConnectionPresent: boolean | null = null;
    db: Database | null = null;
    dbFileName: string;
    dataSource:DataSource | null = null;
    constructor(DatabaseFilePath: string) {
        this.dbPath = path.resolve(DatabaseFilePath);
        this.dbFileName = DatabaseFilePath.slice(2);
        this.openDb();
    }

    public openDb(): void {
        this.checkIfDbExists();
        if (this.dbConnectionPresent == false) {
            this.db = new Database(this.dbPath);
        }
        this.dataSource = createAppDataSource(this.dbFileName);
    
    }

    private checkIfDbExists(): void {
        try {
            if (!fs.existsSync(this.dbPath)) {
                console.log("Database doesn't exist. Initialising");
                this.initialiseDb();
                this.dbConnectionPresent = true;
            } else {
                console.log("Database already exists");
                this.dbConnectionPresent = false;
            }
        } catch (error) {
            console.log("Problems checking if Database exists:", error);
        }
    }

    private initialiseDb(): void {
        try {
            this.db = new Database(this.dbPath);
        } catch (error) {
            console.log("Problems creating Database:", error);
        }
    }
}
