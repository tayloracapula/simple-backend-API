import sqlite3, { Database } from 'sqlite3';
import fs from 'fs';
import path from 'path';


 export class DatabaseManager {
    private dbPath:string;
    db: Database | null = null;
    constructor(APIdbFileName: string) {
        this.dbPath = path.resolve(__dirname,APIdbFileName);
    }

    public checkIfDbExists():void {
        try {
            if (!fs.existsSync(this.dbPath)) {
                console.log("Database doesn't exist. Initialising");
                this.initialiseDb()
            } else {
                console.log('Database already exists');
            }
        } catch (error) {
            console.log('Problems checking if Database exists:',error);
        }
    }

    private initialiseDb():void {
        this.db = new sqlite3.Database(this.dbPath, (err) => {
            if (err) {
                console.error('Errors creating Base',err);
            } else {
                this.db?.run(``
                    /* need to add the actual SQL here come up with a DB schema*/ 
                    ,(err) => {
                        if (err) {
                            console.error('Error creating database tables:', err);
                        } else {
                            console.log('Database tables created successfully');
                        }
                    })
            }
        });
    }
}