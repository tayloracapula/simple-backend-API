import { Database } from "bun:sqlite";
import fs from "fs";
import path from "path";
import { createAppDataSource } from "data-source";
import type { DataSource } from "typeorm";
import { DatabaseInitialiser } from "./initialisation/complete_initialisation";
import { Logger } from "server/Logger";

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
    }

    public async openDb(): Promise<void> {
        await this.checkIfDbExists();
        if (this.dbConnectionPresent == false) {
            this.db = new Database(this.dbPath);
            await this.dataSource.initialize();
        }
    }


    private async checkIfDbExists(): Promise<void> {
        try {
            if (!fs.existsSync(this.dbPath)) {
                Logger.info("Database doesn't exist. Initialising");
                await this.dataSource.initialize();
                await this.initialiseDb();
                this.dbConnectionPresent = true;
            } else {
                Logger.info("Database already exists");
                this.dbConnectionPresent = false;
            }
        } catch (error) {
            Logger.error("Problems checking if Database exists:", error);
        }
    }

    private async initialiseDb(): Promise<void> {
        try {
            await this.initialiseStaticDatabaseTables(this.dataSource);
        } catch (error) {
            Logger.error("Problems creating Database:", error);
        }
    }
}
