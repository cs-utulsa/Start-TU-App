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
                 "  Folder varchar(25), " +
                 "	Subject varchar(10000), " +
                 "	Body varchar(10000000), " +
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
}

