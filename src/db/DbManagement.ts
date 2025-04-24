import { Database } from "bun:sqlite";
import fs from "fs";
import path from "path";
import { createAppDataSource } from "data-source";
import type { DataSource } from "typeorm";
import { DatabaseInitialiser } from "./initialisation/complete_initialisation";

export abstract class DatabaseManager extends DatabaseInitialiser {
    private dbPath: string;
    dbConnectionPresent: boolean | null = null;
    db!: Database;
    dbFileName: string;
    dataSource!:DataSource;
    constructor(DatabaseFilePath: string) {
        super();
        this.dbPath = path.resolve(DatabaseFilePath);
        this.dbFileName = DatabaseFilePath;
        this.dataSource = createAppDataSource(this.dbFileName);
        this.openDb();
    }

    public async openDb(): Promise<void> {
        this.checkIfDbExists();
        if (this.dbConnectionPresent == false) {
            this.db = new Database(this.dbPath);
            await this.dataSource.initialize();
        }
    }


    private async checkIfDbExists(): Promise<void> {
        try {
            if (!fs.existsSync(this.dbPath)) {
                console.log("Database doesn't exist. Initialising");
                await this.dataSource.initialize();
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

    private async initialiseDb(): Promise<void> {
        try {
            await this.initialiseStaticDatabaseTables(this.dataSource);
        } catch (error) {
            console.log("Problems creating Database:", error);
        }
    }
}
