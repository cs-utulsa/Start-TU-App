import * as SQLite from 'expo-sqlite'
import {db_name} from './DB_Name';

class Event_Entity {
    DB: SQLite.WebSQLDatabase;

    constructor(database_name: string) {
        this.DB = SQLite.openDatabase(database_name);
    }

    createEventTable() {
        this.DB.transaction(
          (tx) => {
            const sqlCommand:string = 
            
            "Create Table IF NOT EXISTS Event( " +
            "    Name Varchar(500) Primary key NOT NULL, " +
            "    Description VARCHAR(5000) NOT NULL, "
            "    Datetime_Event Datetime, "
            "    Category Varchar(100), "
            "    Location_Name Varchar(100), "
            "    Foreign key(Location_Name) References Location(Name)ON DELETE CASCADE ON UPDATE CASCADE "
            ");";
    
            tx.executeSql(sqlCommand);
          },
    
          //Console is logged if the transaction fails.
          (error) => {
            console.log(error.message);
          },
          //Console is logged if the transaction succeeds.
          () => {
            console.log('Successfully created the person table');
          }
             
        );
    }
}
export type Location_Data = {
    Name: string,
    Description: string,
    Datetime_Event: Date,
    Category: string,
    Location: string
}

export const Event: Event_Entity = new Event_Entity(db_name);