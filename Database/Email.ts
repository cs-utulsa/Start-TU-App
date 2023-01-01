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

    dropLocationTable() {
        this.DB.transaction(
            (tx) => {
                const sqlCommand:string = "DROP TABLE Email";
                tx.executeSql(sqlCommand);
            },
  
            (error) => {
                console.log(error.message);
            },
            () => {
                console.log('Successfully dropped the email table');
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

    queryAttributes_MonthYear_Folder(month: number, year: number, folder: string = 'Inbox'): Promise<Email_Data[]> {
        return new Promise((resolve, reject) => {
            let email_data: Email_Data[] = [];

            this.DB.transaction(
                (tx) => {
                    const initialSQLCommand = 
                        "SELECT * " +
                        "FROM Email as E " +
                        "WHERE strftime('%m', E.ReceivedTime) LIKE '%{month}' " +
                        "  and strftime('%Y', E.ReceivedTime) LIKE '%{year}' " +
                        "  and E.Folder = '{folder}';";
                    
                    const sqlCommand = initialSQLCommand.replace('{month}', month.toString())
                                                        .replace('{year}', year.toString())
                                                        .replace('{folder}', folder);

                    tx.executeSql(sqlCommand, [], 
                        (tx, results) => {
                            email_data = results.rows._array;
                        }
                    );
                },
                (error) => {
                    reject(error.message);
                },
                () => {
                    resolve(email_data);
                }
            );
        });
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