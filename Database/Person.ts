import * as SQLite from 'expo-sqlite'
import {db_name} from './DB_Name';

export class Person_Entity {
    DB: SQLite.WebSQLDatabase;

    constructor(database_name: string) {
        this.DB = SQLite.openDatabase(database_name);
    }

    createPersonTable() {
        this.DB.transaction(
          (tx) => {
            const sqlCommand:string = 
            
            "CREATE TABLE IF NOT EXISTS Person"
            + "(" 
            + "TU_Email VARCHAR(18) PRIMARY KEY NOT NULL"
            + ", Name VARCHAR(30)"
            + ", Password VARCHAR(30)"
            + ");";
    
            tx.executeSql(sqlCommand);
          },
    
          (error) => {
            console.log(error.message);
          },
          () => {
            console.log('Successfully created the person database');
          }
             
        );
      }
    
      insertIntoPersonTable(Person_Data: Person_Data) {
        this.DB.transaction(
          (tx) => {
            const sqlCommand:string = 
            
            "INSERT INTO Person (TU_EMAIL, Name, Password) values "
            + "(?, ?, ?)";
            tx.executeSql(sqlCommand, [Person_Data.TU_Email, Person_Data.Name, Person_Data.Password]);
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            console.log('Successfully inserted entry into Person table');
          }
        );
      }
}

export interface Person_Data {
    TU_Email: string,
    Name: string,
    Password: string
}

export const Person: Person_Entity = new Person_Entity(db_name);