import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity, Switch } from 'react-native';

import {Person, Person_Data} from './Database/Person';
import {Location, Location_Data} from './Database/Location';

export default function App() {

    // const person1: Person_Data = {
    //   TU_Email: "lar9482@utulsa.edu",
    //   Name: "Luke Runnels",
    //   Password: "password123"
    // };

    // const person2: Person_Data = {
    //   TU_Email: "jdd9482@utulsa.edu",
    //   Name: "John Doe",
    //   Password: "password456"
    // };

    // const location1: Location_Data = {
    //   Name: "Keplinger Hall",
    //   Address: "TU Campus",
    //   Latitude: 100,
    //   Longitude: 200

    // };

    // Person.createPersonTable();
    // Location.createLocationTable();

    // Person.insertIntoPersonTable(person1);
    // Person.insertIntoPersonTable(person2);
    
    // Location.insertIntoLocationTable(location1);

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