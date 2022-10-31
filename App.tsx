import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity, Switch } from 'react-native';

import {Person, Person_Data} from './Database/Person';
import {Location, Location_Data} from './Database/Location';


const TU_BLUE = '#102240';
let data: Person_Data[] = [];

export default function App() {

  const person: Person_Data = {
    TU_Email: "123444@utulsa.edu",
    Name: "John Doe",
    Password: "123password"
  };

  const location: Location_Data = {
    Name: "Keplinger Hall",
    Address: "1",
    Latitude: 1,
    Longitude: 2
  };
  //Person.insertIntoPersonTable(person);
  //let response = Person.queryAllAttributes_Async();
  //console.log(response);
  //console.log(response);

  //console.log(test);
  Person.queryAllAttributes_Async().then((value) => {
    console.log(value[0].Name)
    alert(value[0].Name)
  });

  
  return (
    <View style={styles.container}>
      <Text>Start of TU APP. This is our senior project for 2022-2023.</Text>
      <Text></Text>
      <StatusBar style="auto" />
      <DatabaseButton dbString = "Hello world"></DatabaseButton>
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