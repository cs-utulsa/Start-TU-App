import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system';
import * as Share from 'expo-sharing';
import { Asset } from 'expo-asset';

//For now, I'm testing the pathfile and database on my machine.
const databasePath = 'C:\\Users\\luker\\source\\repos\\Start-TU-App\\Start-TU-App\\Database';
const databaseName = 'TU_Database.db';

export async function downloadDatabase_Machine_To_Expo() {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require(databasePath + '\\' + databaseName)).uri,
    FileSystem.documentDirectory + 'SQLite/' + databaseName
  );
  return SQLite.openDatabase(databaseName);
}


export async function downloadDatabase_Expo_To_Machine() {
  await Share.shareAsync(FileSystem.documentDirectory + 'SQLite/' + databaseName);
}

export async function deleteDatabaseFile() {
  await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite/' + databaseName);
}


export interface Person_Data {
  TU_Email: string,
  Name: string,
  Password: string
}

export interface Location_Data {
  Name: string,
  Address: string,
  Latitude: number,
  Longitude: number
}

class TU_DB {
  DB: SQLite.WebSQLDatabase;

  constructor(database_name: string) {
    this.DB = SQLite.openDatabase(database_name);
  }

  createPersonTable() {
    this.DB.readTransaction(
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

  createLocationTable() {
    this.DB.readTransaction(
      (tx) => {
        const sqlCommand:string = 
        
        "CREATE TABLE IF NOT EXISTS Location"
        + "(" 
        + "Name VARCHAR(18) PRIMARY KEY NOT NULL,"
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
}

export const db: TU_DB = new TU_DB(databaseName);