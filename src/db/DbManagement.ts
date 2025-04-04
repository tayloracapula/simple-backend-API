import { Database } from "bun:sqlite";
import fs from "fs";
import path from "path";

interface DbInteraction {
  addEntry(table: string): void;
}

export class DatabaseManager {
  private dbPath: string;
  dbConnectionPresent : boolean | null = null;
  db: Database | null = null;

  constructor(APIdbFileName: string) {
    this.dbPath = path.resolve(APIdbFileName);
    this.openDb();
  }

  public openDb(): void {
    this.checkIfDbExists();
    if (this.dbConnectionPresent == false) {
      this.db = new Database(this.dbPath);
    }
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
