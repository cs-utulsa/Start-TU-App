import * as SQLite from 'expo-sqlite'
import {db_name} from './DB_Name';
import {Location_Tag_Entity} from './Location_Tag'

/**
 * This class serves as a wrapper for all queries that return 'Location' attributes.
 */
export class Location_Entity {
    DB: SQLite.WebSQLDatabase;

    //The 'Location_Tag' table serves as a dependent of the 'Location' table.
    Tags_Table: Location_Tag_Entity;

    constructor(database_name: string) {
        this.DB = SQLite.openDatabase(database_name);
        this.Tags_Table = new Location_Tag_Entity(database_name);
    }

    /**
     * This method will run a transaction to create the 'Location' Table
     * - Name(PK): This is the unique name that's referenced to at a particular set of coordinates. 
     * - Description: Description of the location for the user to see.
     * - Latitude: Latitude of the location
     * - Longitude: Longitude of the location
     * 
     * NOTE: 'Location_Tag' is also created within this method.
     */
    createLocationTable() {
        this.DB.transaction(
          (tx) => {
            const sqlCommand:string = 
            
            "CREATE TABLE IF NOT EXISTS Location"
            + "(" 
            + "Name VARCHAR(100) PRIMARY KEY NOT NULL,"
            + "Description VARCHAR(5000),"
            + "Latitude REAL,"
            + "Longitude REAL"
            + ");";
            tx.executeSql(sqlCommand);

            //Location_Tag table is created as well.
            this.Tags_Table.createLocationTagTable();
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            console.log('Successfully created the location database');
          }
        );
    }

    dropLocationTable() {
      this.DB.transaction(
          (tx) => {
              this.Tags_Table.dropLocationTagTable();
              const sqlCommand:string = "DROP TABLE Location";
              tx.executeSql(sqlCommand);
          },

          (error) => {
              console.log(error.message);
            },
            () => {
              console.log('Successfully drop the Location Tag table');
            }
      );
    }
    
    insertIntoLocationTable(Location_Data: Location_Data) {
        this.DB.transaction(
        (tx) => {
          const sqlCommand:string = 
            
          "INSERT INTO Location (Name, Description, Latitude, Longitude) values "
          + "(?, ?, ?, ?)";
          tx.executeSql(sqlCommand, [Location_Data.Name, Location_Data.Description, Location_Data.Latitude, Location_Data.Longitude]);

          this.Tags_Table.insertIntoLocationTagTable(Location_Data);
        },

        (error) => {
          console.log(error.message);
        },
        () => {
          console.log('Successfully inserted entry into Location table');
        }
       );
    }

    async queryAllAttributes_Async(): Promise<Location_Data[]> {
      return new Promise((resolve, reject) => {
        let Location_Data: Location_Data[] = [];

        this.DB.readTransaction(
          (tx) => {
            const sqlCommand: string = 
            "SELECT *" + 
            "FROM Location";
            tx.executeSql(sqlCommand, [] ,
              (tx, results) => {
                Location_Data = results.rows._array
              }
            );
          },
          (error) => {
            reject(error.message);
          },
          () => {
            resolve(Location_Data);
          }
        );
      })
    }

    async queryAttributes_Tag(tag: string = "all"): Promise<Location_Data[]> {
      return new Promise((resolve, reject) => {
        let Location_Data: Location_Data[] = [];

        this.DB.transaction(
          (tx) => {
            const sqlCommand: string = 
            "select L.Name, L.Description, L.Latitude, L.Longitude " +
            "from Location as L join Location_Tag as LT on L.Name=LT.Location_Name " +
            "where LT.Tag=?";

            tx.executeSql(sqlCommand, [tag],
              (tx, results) => {
                Location_Data = results.rows._array;
              }
            );

          },

          (error) => {
            reject(error.message);
          },

          () => {
            resolve(Location_Data);
          }
        );
      });
    }

    async queryAttributes_Name(Name: string): Promise<Location_Data> {
      return new Promise((resolve, reject) => {
        let Location_Data: Location_Data[] = [];

        this.DB.transaction(
          (tx) => {
            const sqlCommand: string =
            'select L.Name, L.Description, L.Latitude, L.Longitude ' +
            'from Location as L ' +
            'where upper(L.Name) = upper(?);';

            tx.executeSql(sqlCommand, [Name],
              (tx, results) => {
                Location_Data = results.rows._array;
              }
            );
          },
          (error) => {
            reject(error.message);
          },
          () => {
            resolve(Location_Data[0]);
          }
        );
      });
    }
}

export type Location_Data = {
    Name: string,
    Description: string,
    Latitude: number,
    Longitude: number,
    Tags: string[]
}

export const Location: Location_Entity = new Location_Entity(db_name);