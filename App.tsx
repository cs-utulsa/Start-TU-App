import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity, Switch } from 'react-native';
import {db, Person_Data, Location_Data, downloadDatabase_Expo_To_Machine} from './Database/TU_DB';

const TU_BLUE = '#102240';

export default function App() {
  // downloadDatabase_Expo_To_Machine();

  // downloadDatabase_Machine_To_Expo().then(
  //   (db) => {
  //     db.transaction((tx)=> {
  //       const sqlCommand:string = "CREATE TABLE IF NOT EXISTS Person"
  //       + "(" 
  //       + "TU_Email VARCHAR(18) PRIMARY KEY NOT NULL"
  //       + ", Name VARCHAR(30)"
  //       + ", Password VARCHAR(30)"
  //       + ");";
  //       tx.executeSql(sqlCommand);
  //     }, 
  //     (test) => {
  //       console.log(test.message);
  //     },
  //     () => {
  //       console.log('Success');
  //     });
  //   }
  // ); 

  // db.createPersonTable();
  // db.createLocationTable();

  const test: Person_Data = {
    TU_Email: 'lar9482@utulsa',
    Name: 'Luke Runnels',
    Password: 'password123'
  }
  db.insertIntoPersonTable(test);

  return (
    <View style={styles.container}>
      <Text>Start of TU APP. This is our senior project for 2022-2023.</Text>
      <StatusBar style="auto" />
      <DatabaseButton dbString = {test123}></DatabaseButton>
    </View>
  );
}

const DatabaseButton = (props: any) => (
 <View>
    <TouchableOpacity onPress={props.dbString}>
    </TouchableOpacity>
 </View>
);

const test123 = () => {
  console.log("Hello from button");
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomButtons: {
    flex: 1,
    backgroundColor: TU_BLUE,
    alignItems: 'center'
  },
});