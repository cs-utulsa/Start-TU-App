import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, TouchableOpacity, Switch, TextInput} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { getTokenSourceMapRange, isPropertySignature, setTextRange } from 'typescript';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {MapOrEntries, useMap} from 'usehooks-ts';

// import logo from './assets/icon.png';

const DARK_BLACK = '#171D28'
const LIGHT_BLUE = '#C0E2F6'
const DARK_BLUE = '#315796'
const PANK = '#C490EB'
const TU_GOLD = '#C2A01E'
const TU_BLUE = '#102240'
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


export default function App() {
  
  const[paneState, setPaneState] = useState(MAP_STATE);
  const [text, onChangeText] = React.useState("Useless Text");
  const initialValues: MapOrEntries<String, Array<String | any>> = [["KEP", [{latitude: 36.153979761758876, longitude: -95.94205412959185}, "Keplinger Hall", "This is where Ben's Marker is"]]]
  
  let markerMap = new Map()
  const possibleTags = ["all", "ens", "housing"]
  const currentTags = ["all"]
  const [filters, setFilters] = useState(currentTags)

  const filterPins = (tag: string)  => {
    // filters.map((filter) => filter == "ENS" ? {filter})
    if (possibleTags.includes(tag)) {
      setFilters([tag])
      console.log(tag)
    }
    console.log(filters)
  }

  return (
    <View style={{flex: 1, backgroundColor: TU_BLUE}}>
      <View style={{padding: 0}}>
      </View>
      <View style={{flex: 1}}>
        <StatusBar style="light"/>
      <View style={{paddingTop:20, padding: 5}}>
        <Image
          style={{width: 50, height: 50}}
          source={require('./assets/TUlogo.png')}
        />
      </View>
      <View style={{flex: 1}}>
        <StatusBar style="light"/>
        {paneState == USER_STATE && <UserPane></UserPane>}
        {paneState == CLASSES_STATE && <ClassesPane></ClassesPane>}
        {paneState == MAP_STATE && <MapPane filters={filters} filterPins={filterPins} currentTags={currentTags}></MapPane>}
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
    <TouchableOpacity onPress={() => changeState(0)} activeOpacity = {1} style={styles.bottomButton}>
      {state == USER_STATE && <Image style={styles.icon} source={require('./assets/TUuserinv.png')} />}
      {state != USER_STATE && <Image style={styles.icon} source={require('./assets/TUuser.png')} />}
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
    <TouchableOpacity onPress={() => changeState(4)} activeOpacity = {1} style={styles.bottomButton}>
      {state == EMAIL_STATE && <Image style={styles.icon} source={require('./assets/TUemailinv.png')} />}
      {state != EMAIL_STATE && <Image style={styles.icon} source={require('./assets/TUemail.png')} />}
    </TouchableOpacity>
      
  </View>
);

const UserPane = () => (
  <View style={styles.userPane}>
    <Text> USERS ARE NOT YET IMPLEMENTED</Text>
  </View>
)

const ClassesPane = () => (
  <View style={styles.classesPane}>
    <Text> CLASSES ARE NOT YET IMPLEMENTED</Text>
  </View>
);

const MapPane= ({filters, filterPins, currentTags} : any) => (
  <View style={styles.mapPane}>
    <TextInput onSubmitEditing={(e) => filterPins(e.nativeEvent.text.toLowerCase())}></TextInput>
    <MapView 
      initialRegion={{
        latitude: 36.15236,
        longitude: -95.94575,
        latitudeDelta: 0.01,
        longitudeDelta: 0.0125,}} 
      style = {{height: '100%', width: '100%'}}>
      {(filters.includes("ens")  || filters.includes("all")) && <Marker
        key={0}
        coordinate={{latitude: 36.153979761758876, longitude: -95.94205412959185}}
        title={"Keplinger Hall"}
        description={"This is where Ben's Marker is"} />}
      {(filters.includes("ens")  || filters.includes("all")) && <Marker
        key={1}
        coordinate={{latitude: 36.15312927984461, longitude: -95.94206106343141}}
        title={"Stephenson Hall"}
        description={"This is where Ben's Marker is"}
      />}
      {(filters.includes("housing")  || filters.includes("all")) && <Marker
        key={2}
        coordinate={{latitude: 36.15322236736723, longitude: -95.94873798075692}}
        title={"John Mabee"}
        description={"This is where Ben's Marker is"}
      />}
      {(filters.includes("ens")  || filters.includes("all")) && <Marker
        key={3}
        coordinate={{latitude: 36.15313162846364, longitude: -95.94272874465813}}
        title={"Rayzor Hall"}
        description={"This is where Ben's Marker is"}
      />}
      {filters.includes("all") && <Marker
        key={4}
        coordinate={{latitude: 36.153439180383586, longitude: -95.94357520929442}}
        title={"Alan Chapman Student Union"}
        description={"This is where Ben's Marker is"}
      />}
    </MapView> 
  </View>
);

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
    backgroundColor: DARK_BLUE,
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
    backgroundColor: TU_GOLD,
    paddingBottom: 5,
    alignItems: 'center',
    padding: 5
  },
});