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
            "    Description VARCHAR(10000) NOT NULL, " +
            "    Date_Start Datetime NOT NULL, " +
            "    Date_End Datetime NOT NULL, " +
            "    Category Varchar(100), " +
            "    Location_Name Varchar(100), " +
            "    Foreign key(Location_Name) References Location(Name) ON DELETE CASCADE ON UPDATE CASCADE " +
            ");";
    
            tx.executeSql(sqlCommand);
          },
    
          //Console is logged if the transaction fails.
          (error) => {
            console.log(error.message);
          },
          //Console is logged if the transaction succeeds.
          () => {
            console.log('Successfully created the event table');
          }
             
        );
    }

    dropEventTable() {
      this.DB.transaction(
        (tx) => {
          const sqlCommand = 
          "Drop Table Event;";

          tx.executeSql(sqlCommand);
        },
        (error) => {
          console.log(error.message);
        }, 
        () => {
          console.log('Successfully dropped the event table.');
        }
      );
    }

    insertIntoEventTable(Event: Event_Data) {
      this.DB.transaction(
        (tx) => {
          const sqlCommand = 
          "Insert into Event(Name, Description, Date_Start, Date_End, Category, Location_Name) values " +
          "(?, ?, ?, ?, ?, ?)";

          tx.executeSql(sqlCommand, [Event.Name, Event.Description, Event.Date_Start.toISOString(), 
                                     Event.Date_End.toISOString(), Event.Category, Event.Location]);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          console.log('Succesfully inserted an event instance into the event table.');
        }
      ); 
    }

    async queryAttributes_MonthYear(startMonth: number, startYear: number): Promise<Event_Data[]> {

      return new Promise((resolve, reject) => {
        let event_data: Event_Data[] = [];

        this.DB.transaction(
          (tx) => {
            const initialSQLCommand = 
            "SELECT * " +
            "FROM Event as E " +
            "WHERE strftime('%m', E.Date_Start) LIKE '%{startMonth}' AND strftime('%Y', E.Date_Start) LIKE '%{startYear}';";

            const sqlCommand = initialSQLCommand.replace('{startMonth}', startMonth.toString())
                                                .replace('{startYear}', startYear.toString());

            tx.executeSql(sqlCommand, [],
              (tx, results) => {
                event_data = results.rows._array;
              });
          },
          (error) => {
            reject(error.message);
          },
          () => {
            resolve(event_data);
          } 
        );
      });
    }
}

export type Event_Data = {
    Name: string,
    Description: string,
    Date_Start: Date,
    Date_End: Date,
    Category: string,
    Location: string
}

export const Event: Event_Entity = new Event_Entity(db_name);