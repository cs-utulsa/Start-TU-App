import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity, Switch } from 'react-native';

import {Person, Person_Data} from './Database/Person';
import {Location, Location_Data} from './Database/Location';
import { populate } from './Database/Populate_DB';

import { downloadDatabase_Expo_To_Machine } from './Database/Utilities';

export default function App() {

    //Person.dropPersonTable();
    //Location.dropLocationTable();
    
    populate();

    //downloadDatabase_Expo_To_Machine();
    return(
    <View style={styles.container}>
      <Text>Database Testing Branch</Text>
      <StatusBar style="auto" />
      <QueryPerson queryFunction={Person.queryAllAttributes_Async()} title ={"Query Person"}></QueryPerson>
      <QueryLocation queryFunction={Location.queryAllAttributes_Async()} title = {"Query Location"}></QueryLocation>
    </View>
    );
}

const QueryPerson = ({queryFunction, title}: any) => (
  <View>
    <Button onPress={() => queryFunction.then(
      (value: Person_Data[]) => 
      {
        let allNames: string = "";
        for (let i = 0; i < value.length; i++) {
          allNames += value[i].Name + " ";
        }
        alert(allNames)
      }
      )} 
      title = {title}/>
  </View>
);


const QueryLocation = ({queryFunction, title}: any) => (
  <View>
    <Button onPress={() => queryFunction.then(
      (value: Location_Data[]) => 
      {
        let allNames: string = "";
        for (let i = 0; i < value.length; i++) {
          allNames += value[i].Name;
        }
        alert(allNames)
      }
      )} 
      title = {title}/>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});