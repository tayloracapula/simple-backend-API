import { Database } from "bun:sqlite";
import fs from "fs";
import path from "path";

interface DbInteraction {
  addEntry(table: string): void;
}

export class DatabaseManager {
  private dbPath: string;
  db: Database | null = null;

  constructor(APIdbFileName: string) {
    this.dbPath = path.resolve(__dirname, APIdbFileName);
  }

  public openDb(): void {
    this.checkIfDbExists();
    this.db;
  }

  private checkIfDbExists(): void | Boolean {
    try {
      if (!fs.existsSync(this.dbPath)) {
        console.log("Database doesn't exist. Initialising");
        this.initialiseDb();
        return true;
      } else {
        console.log("Database already exists");
        return false;
      }
    } catch (error) {
      console.log("Problems checking if Database exists:", error);
    }
  }

  private initialiseDb(): void {
    try {
      this.db = new Database(this.dbPath);
      const dbCreationString: string = ""; /*add the DB creation here*/
      const dbCreationQuery = this.db.query(dbCreationString);
      dbCreationQuery.run();
    } catch (error) {
        
    }
  }
}
