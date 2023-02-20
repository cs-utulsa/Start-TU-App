import * as SQLite from 'expo-sqlite'
import {db_name} from './DB_Name';

class Email_Entity {
    DB: SQLite.WebSQLDatabase;

    constructor(database_name: string) {
        this.DB = SQLite.openDatabase(database_name);
    }

    createEmailTable() {
        this.DB.transaction(
            (tx) => {
                const sqlCommand: string = 
                "Create Table IF NOT EXISTS Event( " +
                "    Id Varchar(250) Primary key NOT NULL, " +
                "    Sender_Email VARCHAR(50) NOT NULL, " +
                "    Receiver_Email VARCHAR(50) NOT NULL, " +
                "    Subject VARCHAR(10000), " +
                "    Body VARCHAR(10000000), " +
                "    sentDataTime datetime, " +
                "    receivedDateTime datetime, " +
                ");";

                tx.executeSql(sqlCommand);
            },
            //Console is logged if the transaction fails.
            (error) => {
                console.log(error.message);
            },
            //Console is logged if the transaction succeeds.
            () => {
                console.log('Successfully created the email table');
            }
        )
    }

    dropEventTable() {
        this.DB.transaction(
          (tx) => {
            const sqlCommand = 
            "Drop Table Email;";
  
            tx.executeSql(sqlCommand);
          },
          (error) => {
            console.log(error.message);
          }, 
          () => {
            console.log('Successfully dropped the email table.');
          }
        );
      }
}

export type Event_Data = {
    Id: string
    Sender_Email: string
    Receiver_Email: string
    Subject: string
    Body: string
    sentDataTime: Date
    receivedDateTime: Date
}

export const Event: Email_Entity = new Email_Entity(db_name);