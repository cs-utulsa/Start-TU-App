import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';


//For now, I'm testing the pathfile and database on my machine.
var databasePath = 'C:\\Users\\luker\\source\\repos\\Start-TU-App\\Start-TU-App\\Database';
var databaseName = 'TU_Database.db';

async function openDatabase() {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require(databasePath + '\\' + databaseName)).uri,
    FileSystem.documentDirectory + 'SQLite/' + databaseName
  );
  return SQLite.openDatabase(databaseName);
}

export default function App() {
  openDatabase().then(
    db => {
      db.transaction((tx)=> {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Person"
          + "(" 
          + "TU_Email VARCHAR(18) PRIMARY KEY NOT NULL"
          + ", Name VARCHAR(30)"
          + ", Password VARCHAR(30)"
          + ");"
      );
      })
    }
  ); 

  console.log(databasePath);
  console.log(databaseName);

  return (
    <View style={styles.container}>
      <Text>Start of TU APP. This is our senior project for 2022-2023.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});