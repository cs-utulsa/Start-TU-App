import * as SQLite from 'expo-sqlite'
import { resolveModuleName } from 'typescript';
import {db_name} from './DB_Name';

/**
 * This class serves a wrapper for all queries that return 'Person' attributes.
 */
class Person_Entity {
    DB: SQLite.WebSQLDatabase;

    constructor(database_name: string) {
        this.DB = SQLite.openDatabase(database_name);
    }

    /**
     * This method will run a transaction to create the 'Person' Table
     * - PK: TU_Email (e.g lar9482@utulsa.edu)
     * - Name: Name of the student
     * - Password: Local student's password(
     *   NOTE: Password is NOT the student's email password.
     *         It's meant as a password for this application.
     */
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
    
          //Console is logged if the transaction fails.
          (error) => {
            console.log(error.message);
          },
          //Console is logged if the transaction succeeds.
          () => {
            console.log('Successfully created the person table');
          }
             
        );
    }

    /**
     * This method will run a transaction to drop the Person table.
     */
    dropPersonTable() {
        this.DB.transaction(
            (tx) => {
                const sqlCommand:string = "DROP TABLE Person";
                tx.executeSql(sqlCommand);
            },

            //Console is logged if the transaction fails.
            (error) => {
                console.log(error.message);
            },
            //Console is logged if the transaction succeeds.
            () => {
              console.log('Successfully drop the Person table');
            }
        );
    }
    
    /**
     * This method will insert 'Person_Data' instance data into the 'Person' Table
     * @param Person_Data This interface instance is the data to be inserted into the 'Person' Table
     */
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

    /**
     * This method makes a query to get all instances from the Person Table.
     * @returns A promise(async operation) to return an array of Person_Data. 
     */
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
            console.log(error.message);
          },
          () => {
            resolve(Person_Data);
          }
        );
      })
    }
}

/**
 * This interface is a wrapper of data from the 'Person' Table to be accessed by the rest of the application.
 */
export interface Person_Data {
    TU_Email: string,
    Name: string,
    Password: string
}

export const Person: Person_Entity = new Person_Entity(db_name);