import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system';
import * as Share from 'expo-sharing';
import { Asset } from 'expo-asset';

// export async function downloadDatabase_Machine_To_Expo(databasePath: string, databaseName: string) {
//   if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
//     await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
//   }
//   var fullPath: string = databasePath + "\\" + databaseName;
//   await FileSystem.downloadAsync(
//     Asset.fromModule(require(fullPath)).uri,
//     FileSystem.documentDirectory + 'SQLite/' + databaseName
//   );
//   return SQLite.openDatabase(databaseName);
// }


export async function downloadDatabase_Expo_To_Machine(databaseName: string = 'TU_DB.db') {
  await Share.shareAsync(FileSystem.documentDirectory + 'SQLite/' + databaseName);
}

export async function deleteDatabaseFile(databaseName: string = 'TU_DB.db') {
  await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite/' + databaseName);
}

interface Person_Data {
  TU_Email: string,
  Name: string,
  Password: string
}

interface Location_Data {
  Name: string,
  Address: string,
  Latitude: number,
  Longitude: number
}

export {Person_Data, Location_Data}

export class TU_DB {
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

  createLocationTable() {
    this.DB.transaction(
      (tx) => {
        const sqlCommand:string = 
        
        "CREATE TABLE IF NOT EXISTS Location"
        + "(" 
        + "Name VARCHAR(100) PRIMARY KEY NOT NULL,"
        + "Address VARCHAR(100),"
        + "Latitude REAL,"
        + "Longitude REAL"
        + ");";
        tx.executeSql(sqlCommand);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        console.log('Successfully created the location database');
      }
    );
  }

  insertIntoLocation(Location_Data: Location_Data) {
    this.DB.transaction(
      (tx) => {
        const sqlCommand:string = 
        
        "INSERT INTO Location (Name, Address, Latitude, Longitude) values "
        + "(?, ?, ?, ?)";
        tx.executeSql(sqlCommand, [Location_Data.Name, Location_Data.Address, Location_Data.Latitude, Location_Data.Longitude]);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        console.log('Successfully inserted entry into Location table');
      }
    );
  }
}

const databaseName: string = 'TU_DB.db';
export const db: TU_DB = new TU_DB(databaseName);