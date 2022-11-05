import * as SQLite from 'expo-sqlite'
import {db_name} from './DB_Name';
import {Location_Data} from './Location';

export class Location_Tag_Entity {
    DB: SQLite.WebSQLDatabase;

    constructor(database_name: string) {
        this.DB = SQLite.openDatabase(database_name);
    }

    createLocationTagTable() {
        this.DB.transaction(
          (tx) => {
            const sqlCommand:string = 
            
            "Create Table If not exists Location_Tag (" +
            "    Tag varchar(50) not null, " +
            "    Location_Name varchar(100) not null, " +
            "    Constraint PK_Location_Tag Primary key (Tag, Location_Name) " +
            "    Foreign Key (Location_Name) References Location(Name) ON DELETE CASCADE ON UPDATE CASCADE " +
            ");";
            

            tx.executeSql(sqlCommand);
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            console.log('Successfully created the location tag table');
          }
        );
    }

    dropLocationTagTable() {
        this.DB.transaction(
            (tx) => {
                const sqlCommand:string = "DROP TABLE Location_Tag";
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

    insertIntoLocationTagTable(Location_Data: Location_Data) {
        this.DB.transaction(
            (tx) => {
              for (let i = 0; i < Location_Data.Tags.length; i++) {
                const sqlCommand:string = 
                
                "insert into Location_Tag (Tag, Location_Name) values "
                + "(?, ?)";
                tx.executeSql(sqlCommand, [Location_Data.Tags[i].toLowerCase(), Location_Data.Name]);
              }
            },
    
            (error) => {
              console.log(error.message);
            },
            () => {
              console.log('Successfully inserted entry into Location_Tag table');
            }
        );
    }
}

