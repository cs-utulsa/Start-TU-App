import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity, Switch, TextInput} from 'react-native';

import {Person, Person_Data} from './Database/Person';
import {Location, Location_Data} from './Database/Location';
import { populate } from './Database/Populate_DB';

import { downloadDatabase_Expo_To_Machine } from './Database/Utilities';

export default function App() {

    //Person.dropPersonTable();
    //Location.dropLocationTable();    

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

      <QueryLocationTag 
          query={Location.queryAttributes_Tag(locationDataQueryTag)} 
          markerData={locationData}
          setMarkerData={setLocationData}
          setMarkerTag={setQueryTag}>    
      </QueryLocationTag>

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

const QueryLocationTag = ({query, markerData, setMarkerData, setMarkerTag}: any) => (
  <View>
    <TextInput onSubmitEditing = {(e) => {
      const tagInput: string = e.nativeEvent.text.toLowerCase();
      if (tagInput == "") {
        setMarkerTag("all");
      }
      else {
        setMarkerTag(e.nativeEvent.text.toLowerCase());
      }
      
      query.then((value: Location_Data[]) => {
        setMarkerData(value);
      })
    }}>
    </TextInput>

    {markerData.map((item: Location_Data, index: number) => 
      <Text key={item.Name}>{item.Name}</Text>)}
    
    
   </View>
)





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});