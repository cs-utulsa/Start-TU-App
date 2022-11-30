import React, { useState, useEffect, Dispatch } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, TouchableOpacity, Switch, TextInput} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { getTokenSourceMapRange, isPropertySignature, setTextRange } from 'typescript';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

import {MapOrEntries, useMap} from 'usehooks-ts';

import {Person, Person_Data} from './Database/Person';
import {Location, Location_Data} from './Database/Location';
import { populate } from './Database/Populate_DB';

// import logo from './assets/icon.png';

const DARK_BLACK = '#171D28'
const LIGHT_BLUE = '#C0E2F6'
const DARK_BLUE = '#315796'
const PANK = '#C490EB'
const TU_GOLD = '#C2A01E'
const TU_BLUE = '#102240'
const TU_LIGHT_BLUE = '#004B8D'
const USER_STATE = 0
const CLASSES_STATE = 1
const MAP_STATE = 2
const CALENDER_STATE = 3
const EMAIL_STATE = 4
const images = {
  mainButtons: {
    map: require('./assets/TUmap.png'),
  },
};

//A VALID API KEY IS NEEDED
import {GOOGLE_MAPS_API_KEY} from './creds';
import {DirectionButton} from './PaneComponents/MapPaneComponents/DirectionButton';


export default function App() {
  const[paneState, setPaneState] = useState(MAP_STATE);
   
  Person.dropPersonTable();
  Location.dropLocationTable();
  populate();

  return (
    <View style={{flex: 1, backgroundColor: TU_BLUE}}>
      <View style={{padding: 0}}>
      </View>
      <View style={{flex: 1}}>
        <StatusBar style="light"/>
      <View style={{paddingTop:20}}>
        <Image
          style={{width: 50, height: 50}}
          source={require('./assets/TUlogonormal.png')}
        />
      </View>
      <View style={{flex: 1}}>
        <StatusBar style="light"/>
        {paneState == USER_STATE && <UserPane></UserPane>}
        {paneState == CLASSES_STATE && <ClassesPane></ClassesPane>}

        {paneState == MAP_STATE && <MapPane></MapPane>}

        {paneState == CALENDER_STATE && <CalenderPane></CalenderPane>}
        {paneState == EMAIL_STATE && <EmailPane></EmailPane>}
        <BottomButtons state={paneState} changeState={setPaneState}></BottomButtons>
      </View>
    </View>
    </View>
  );
}

const BottomButtons = ({state, changeState}: any) => (
  <View style={styles.bottomButtonRow}>
    <TouchableOpacity onPress={() => changeState(4)} activeOpacity = {1} style={styles.bottomButton}>
      {state == EMAIL_STATE && <Image style={styles.icon} source={require('./assets/TUemailinv.png')} />}
      {state != EMAIL_STATE && <Image style={styles.icon} source={require('./assets/TUemail.png')} />}
    </TouchableOpacity>
    <TouchableOpacity onPress={() => changeState(1)} activeOpacity = {1} style={styles.bottomButton}>
      {state == CLASSES_STATE && <Image style={styles.icon} source={require('./assets/TUclassesinv.png')} />}
      {state != CLASSES_STATE && <Image style={styles.icon} source={require('./assets/TUclasses.png')} />}
    </TouchableOpacity>
    <TouchableOpacity onPress={() => changeState(2)} activeOpacity = {1} style={styles.bottomButton}>
      {state == MAP_STATE && <Image style={styles.icon} source={require('./assets/TUmapinv.png')} />}
      {state != MAP_STATE && <Image style={styles.icon} source={require('./assets/TUmap.png')} />}
    </TouchableOpacity>
    <TouchableOpacity onPress={() => changeState(3)} activeOpacity = {1} style={styles.bottomButton}>
      {state == CALENDER_STATE && <Image style={styles.icon} source={require('./assets/TUcalenderinv.png')} />}
      {state != CALENDER_STATE && <Image style={styles.icon} source={require('./assets/TUcalender.png')} />}
    </TouchableOpacity>
    <TouchableOpacity onPress={() => changeState(0)} activeOpacity = {1} style={styles.bottomButton}>
      {state == USER_STATE && <Image style={styles.icon} source={require('./assets/TUuserinv.png')} />}
      {state != USER_STATE && <Image style={styles.icon} source={require('./assets/TUuser.png')} />}
    </TouchableOpacity>
      
  </View>
);

const UserPane = () => (
  <View style={styles.userPane}>
    <Text style={{fontSize: 50}}> Ben</Text>
    <Text style={{fontSize: 20}}> Benjamin Hughes </Text>
    <Text style={{fontSize: 5}}> {"\n"} </Text>
    <Text style={{fontSize: 20}}> bmh7113@utulsa.edu</Text>
    <Text style={{fontSize: 10}}> {"\n"} </Text>
    <Text style={{fontSize: 30}}> Bachelor of Science</Text>
    <Text style={{fontSize: 20}}> Major in Computer Science</Text>
    <Text style={{fontSize: 20}}> Minor in Spanish</Text>
  </View>
)

const ClassesPane = () => (
  <View style={styles.classesPane}>
    <Text> CLASSES ARE NOT YET IMPLEMENTED</Text>
  </View>
);

const MapPane = () => {
  const [markerData, setMarkerData] = useState<Location_Data[]>([{
    Name: "", Description: "", Latitude: 0, Longitude: 0, Tags: [""]
  }]);

  const [origin, setOrigin] = useState<Location_Data>(
    { Name: "Mcfarlin Library", Description: "Main Academic Library",
      Latitude: 36.15232374393028, Longitude: -95.94599221560202, Tags: ["all", "Library"] });

  const [destination, setDestination] = useState<Location_Data>(
    { Name: "Keplinger Hall", Description: "Main Building for the College of Engineering & Natural Science",
      Latitude: 36.153979761758876, Longitude: -95.94205412959185, Tags: ["ens", "all"] });

  const [currentTag, setCurrentTag] = useState<string>("all");

  const [selectingRoute, setSelectingRoute] = useState<boolean>(false);

  Location.queryAttributes_Tag(currentTag).then((value:Location_Data[]) => {
    setMarkerData(value);
  });


  return(
    <View style={styles.mapPane}>
      <View style={{padding:5, paddingBottom:10, height: 50}}>
        <TextInput onSubmitEditing={
          (e) => {
            const tagInput: string = e.nativeEvent.text.toLowerCase();
            setCurrentTag(tagInput);
            Location.queryAttributes_Tag(currentTag).then((value:Location_Data[]) => {
                setMarkerData(value);
              }
            );
          }}
          autoCorrect={false}
        style={{fontSize: 25, height: 30, backgroundColor: DARK_BLUE, flex: 1}}>
        </TextInput>
      </View>

      <MapView 
          initialRegion={{
            latitude: 36.15236,
            longitude: -95.94575,
            latitudeDelta: 0.01,
            longitudeDelta: 0.0125,}} 
          style = {{height: '100%', width: '100%'}}>

          <DirectionButton 
           buttonVisible={selectingRoute} 
           setButtonVisible={setSelectingRoute}></DirectionButton>

          <MapViewDirections
            origin={{latitude: origin.Latitude, longitude: origin.Longitude}}
            destination={{latitude: destination.Latitude, longitude: destination.Longitude}}
            apikey={GOOGLE_MAPS_API_KEY}
            mode={"WALKING"}
            strokeColor={TU_LIGHT_BLUE}
            strokeWidth={3}/>
          {markerData.map((item: Location_Data, index:number) => (
            <Marker
              key={index}
              coordinate={{latitude: item.Latitude, longitude: item.Longitude}}
              title={item.Name}
              description={item.Description}>
            </Marker>
          ))}
      </MapView> 
    </View>
  );
}

const CalenderPane = () => (
  <View style={styles.classesPane}>
    <Text> CALENDER IS NOT YET IMPLEMENTED</Text>
  </View>
);

const EmailPane = () => (
  <View style={styles.classesPane}>
    <Text> EMAIL IS NOT YET IMPLEMENTED</Text>
  </View>
);

const styles = StyleSheet.create({
  userPane: {
    flex: 9,
    backgroundColor: LIGHT_BLUE,
  },
  classesPane: {
    flex: 9,
    backgroundColor: LIGHT_BLUE,
  },
  mapPane: {
    flex: 9,
    backgroundColor: TU_BLUE,
  },
  calenderPane: {
    flex: 9,
    backgroundColor: DARK_BLUE,
  },
  emailPane: {
    flex: 9,
    backgroundColor: DARK_BLUE,
  },
  bottomButtonRow: {
    flex: 1,
    backgroundColor: TU_GOLD,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  bottomButton: {
    flex: 1,
    backgroundColor: TU_GOLD,
    alignItems: 'center',
    padding: 5
  },
  icon: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: DARK_BLUE,
    backgroundColor: TU_BLUE,
    paddingBottom: 5,
    alignItems: 'center',
    padding: 5
  },
});