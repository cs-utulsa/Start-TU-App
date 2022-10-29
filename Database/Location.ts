import * as SQLite from 'expo-sqlite'
import {db_name} from './DB_Name';

export class Location_Entity {
    DB: SQLite.WebSQLDatabase;

    constructor(database_name: string) {
        this.DB = SQLite.openDatabase(database_name);
    }

    createLocationTable() {
        this.DB.transaction(
          (tx) => {
            const sqlCommand:string = 
            
            "CREATE TABLE IF NOT EXISTS Location"
            + "(" 
            + "Name VARCHAR(100) PRIMARY KEY NOT NULL,"
            + "Address VARCHAR(100),"
            + "Latitude REAL,"
            + "Longitude REAL"
            + ");";
            tx.executeSql(sqlCommand);
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            console.log('Successfully created the location database');
          }
        );
      }
    
      insertIntoLocation(Location_Data: Location_Data) {
        this.DB.transaction(
          (tx) => {
            const sqlCommand:string = 
            
            "INSERT INTO Location (Name, Address, Latitude, Longitude) values "
            + "(?, ?, ?, ?)";
            tx.executeSql(sqlCommand, [Location_Data.Name, Location_Data.Address, Location_Data.Latitude, Location_Data.Longitude]);
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            console.log('Successfully inserted entry into Location table');
          }
        );
      }
}

export interface Location_Data {
    Name: string,
    Address: string,
    Latitude: number,
    Longitude: number
}

export const Location: Location_Entity = new Location_Entity(db_name);