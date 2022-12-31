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
                 "Create Table Email( " +
                 "	Id varchar(250) PRIMARY KEY, " +
                 "	Sender_Email varchar(50) NOT NULL, " +
                 "	Receiver_Email varchar(50) NOT NULL, " +
                 "  Folder varchar(10) NOT NULL, " +
                 "	Subject varchar(10000), " +
                 "	Body varchar(10000000), " +
                 "	SentTime datetime, " +
                 "	ReceivedTime datetime, " +
                 "  CONSTRAINT CHK_Folder CHECK(Folder='Inbox') " +
                 ");";

                 tx.executeSql(sqlCommand);
            },
            (error) => {
                console.log(error.message);
            },
            () => {
                console.log('Successfully created the email table');
            }
        );
    }

    insertIntoEmailTable(Email: Email_Data) {
        this.DB.transaction(
            (tx) => {
                const sqlCommand: string = 
                "Insert into Email(Id, Sender_Email, Receiver_Email, Folder, Subject, Body, SentTime, ReceivedTime)" +
                "values (?, ?, ?, ?, ?, ?, ?, ?)";

                tx.executeSql(sqlCommand, [Email.Id, Email.Sender_Email, Email.Receiver_Email, 
                                           Email.Folder, Email.Subject, Email.Body, 
                                           Email.SentTime.toISOString(), Email.ReceivedTime.toISOString()]);
            },
            (error) => {
                console.log(error.message);
            },
            () => {
                console.log('Succesfully inserted an email into the email table.');
            }
        );
    }

    queryAttributes_MonthYear_Inbox(month: number, year: number) {

    }
}

export type Email_Data = {
    Id: string,
    Sender_Email: string,
    Receiver_Email: string,
    Folder: string,
    Subject: string,
    Body: string,
    SentTime: Date,
    ReceivedTime: Date
}

export const Email: Email_Entity = new Email_Entity(db_name);