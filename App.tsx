import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { openDatabaseFromLocalMachine } from './Database/TU_DB';

export default function App() {
  const databasePath: string = "";
  const databaseName: string = "";
  openDatabaseFromLocalMachine(databasePath, databaseName).then(
    (db) => {
      db.transaction((tx)=> {
        const sqlCommand:string = "CREATE TABLE IF NOT EXISTS Person"
        + "(" 
        + "TU_Email VARCHAR(18) PRIMARY KEY NOT NULL"
        + ", Name VARCHAR(30)"
        + ", Password VARCHAR(30)"
        + ");";
        tx.executeSql(sqlCommand);
      }, 
      (test) => {
        console.log(test.message);
      },
      () => {
        console.log('Success');
      });

      
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