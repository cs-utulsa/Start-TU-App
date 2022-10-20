import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

//For now, I'm testing the pathfile and database on my machine.
var databasePath = 'C:\\Users\\luker\\source\\repos\\Start-TU-App\\Start-TU-App\\Database';
var databaseName = 'TU_Database.db';

export async function openDatabaseFromLocalMachine(databasePath: string, databaseName: string) {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require(databasePath + '\\' + databaseName)).uri,
    FileSystem.documentDirectory + 'SQLite/' + databaseName
  );
  return SQLite.openDatabase(databaseName);
}