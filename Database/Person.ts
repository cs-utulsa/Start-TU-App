import * as SQLite from 'expo-sqlite'
import { resolveModuleName } from 'typescript';
import {db_name} from './DB_Name';

class Person_Entity {
    DB: SQLite.WebSQLDatabase;

    queryAllAttributes_Set: Person_Data[];

    constructor(database_name: string) {
        this.DB = SQLite.openDatabase(database_name);
        this.queryAllAttributes_Set = [];
    }

    createPersonTable() {
        this.DB.transaction(
          (tx) => {
            const sqlCommand:string = 
            
            "CREATE TABLE IF NOT EXISTS Person"
            + "(" 
            + "TU_Email VARCHAR(30) PRIMARY KEY NOT NULL"
            + ", Name VARCHAR(30)"
            + ", Password VARCHAR(30)"
            + ");";
    
            tx.executeSql(sqlCommand);
          },
    
          (error) => {
            console.log(error.message);
          },
          () => {
            console.log('Successfully created the person table');
          }
             
        );
    }

    dropPersonTable() {
        this.DB.transaction(

            (tx) => {
                const sqlCommand:string = "DROP TABLE Person";
                tx.executeSql(sqlCommand);
            },

            (error) => {
                console.log(error.message);
              },
              () => {
                console.log('Successfully drop the Person table');
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

    async queryAllAttributes_Async(): Promise<Person_Data[]> {
      
      return new Promise((resolve) => {
        let Person_Data: Person_Data[] = [];

        this.DB.readTransaction(
          (tx) => {
            const sqlCommand: string = 
            "SELECT *" + 
            "FROM Person";
            tx.executeSql(sqlCommand, [] ,
              (tx, results) => {
                Person_Data = results.rows._array
              }
            );
          },
          (error) => {

          },
          () => {
            resolve(Person_Data);
          }
        );
      })
    }
}

export interface Person_Data {
    TU_Email: string,
    Name: string,
    Password: string
}

export const Person: Person_Entity = new Person_Entity(db_name);