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
                "Create Table IF NOT EXISTS Email( " +
                "    Id Varchar(250) Primary key NOT NULL, " +
                "    Sender_Email VARCHAR(50) NOT NULL, " +
                "    Receiver_Email VARCHAR(50) NOT NULL, " +
                "    Subject VARCHAR(10000), " +
                "    Body VARCHAR(10000000), " +
                "    sentDateTime datetime, " +
                "    receivedDateTime datetime " +
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

    insertIntoEmailTable(Email: Email_Data) {
        this.DB.transaction(
            (tx) => {
                const sqlCommand: string = 
                "Insert into Email(Id, Sender_Email, Receiver_Email, Subject, Body, sentDateTime, receivedDateTime) values " +
                "(?, ?, ?, ?, ?, ?, ?)";

                tx.executeSql(sqlCommand, [Email.Id, Email.Sender_Email, Email.Receiver_Email,
                                           Email.Subject, Email.Body, 
                                           Email.sentDateTime.toISOString(), Email.receivedDateTime.toISOString()])
            },
            (error) => {
                console.log(error.message);
            },
            () => {
                console.log('Succesfully inserted an email instance into the email table.');
            }
        )
    }
}

export type Email_Data = {
    Id: string
    Sender_Email: string
    Receiver_Email: string
    Subject: string
    Body: string
    sentDateTime: Date
    receivedDateTime: Date
}

export const Email: Email_Entity = new Email_Entity(db_name);