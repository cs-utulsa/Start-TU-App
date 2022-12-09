import * as FileSystem from 'expo-file-system';
import * as Share from 'expo-sharing';

export async function downloadDatabase_Expo_To_Machine(databaseName: string = 'TU_DB.db') {
    await Share.shareAsync(FileSystem.documentDirectory + 'SQLite/' + databaseName);
}
  
export async function deleteDatabaseFile(databaseName: string = 'TU_DB.db') {
    await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite/' + databaseName);
}