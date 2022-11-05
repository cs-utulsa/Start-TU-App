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
    
    //populate();

    const [locationData, setLocationData] = useState<Location_Data[]>([{
      Name: "",
      Description: "",
      Latitude: 0,
      Longitude: 0,
      Tags: ["ens", "all"]
    }]);
    const [locationDataQueryTag, setQueryTag] = useState("all");
    Location.queryAttributes_Tag(locationDataQueryTag).then((value) => {setLocationData(value)});

    return(
    <View style={styles.container}>
      <Text>Database Testing Branch</Text>
      <StatusBar style="auto" />
      <QueryPerson queryFunction={Person.queryAllAttributes_Async()} title ={"Query Person"}></QueryPerson>

      <QueryLocation queryFunction={Location.queryAttributes_Tag(locationDataQueryTag)} title = {"Query Location"} 
      locationData = {locationData} setLocationData = {setLocationData} setQueryTag={setQueryTag}></QueryLocation>
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


const QueryLocation = ({queryFunction, title, locationData, setLocationData, setQueryTag}: any) => (
  <View>
    <Button onPress={() => queryFunction.then(
      (value: Location_Data[]) => 
      {
        setLocationData(value);
        setQueryTag("ens");
      }
      )} 
      title = {title}/>
      
      
      {locationData.map((item: Location_Data, index: number) => 
        <Text key={item.Name}>{item.Name}</Text>
      )}
      
      
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