import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, TouchableOpacity, Switch } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { getTokenSourceMapRange, isPropertySignature } from 'typescript';
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
var mapImage = [require('./assets/TUmap.png'), require('./assets/TUmapinv.png')];
var mapImageType = 0
const images = {
  mainButtons: {
    map: require('./assets/TUmap.png'),
  },
};
const invert = () => mapImageType = 1;


export default function App() {
  
  const[invImage, setInvImage] = useState(true);
  const[paneState, setPaneState] = useState(MAP_STATE);
  
  const changeState = (state: any) => {
      setPaneState(CLASSES_STATE);
  }

  return (
    <View style={{flex: 1, backgroundColor: TU_BLUE}}>
      {/* <MapView style={{height: '50%', width: '100%'}}/>  */}
      <View style={{paddingTop:20, padding: 5}}>
        <Text> Icon </Text>
      </View>
      <View style={{flex: 1}}>
        <StatusBar style="light"/>
        <Text> Hello</Text>
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
    <TouchableOpacity onPress={() => changeState(0)} activeOpacity = {0.75} style={styles.bottomButton}>
      {state == USER_STATE && <Image style={styles.icon} source={require('./assets/TUuser.png')} />}
      {state != USER_STATE && <Image style={styles.icon} source={require('./assets/TUicon.png')} />}
    </TouchableOpacity>
    <TouchableOpacity onPress={() => changeState(1)} activeOpacity = {0.75} style={styles.bottomButton}>
      {state == CLASSES_STATE && <Image style={styles.icon} source={require('./assets/TUuser.png')} />}
      {state != CLASSES_STATE && <Image style={styles.icon} source={require('./assets/TUicon.png')} />}
    </TouchableOpacity>
    <TouchableOpacity onPress={() => changeState(2)} activeOpacity = {0.75} style={styles.bottomButton}>
      {state == MAP_STATE && <Image style={styles.icon} source={require('./assets/TUmapinv.png')} />}
      {state != MAP_STATE && <Image style={styles.icon} source={require('./assets/TUmap.png')} />}
    </TouchableOpacity>
    <TouchableOpacity onPress={() => changeState(3)} activeOpacity = {0.75} style={styles.bottomButton}>
      {state == CALENDER_STATE && <Image style={styles.icon} source={require('./assets/TUuser.png')} />}
      {state != CALENDER_STATE && <Image style={styles.icon} source={require('./assets/TUicon.png')} />}
    </TouchableOpacity>
    <TouchableOpacity onPress={() => changeState(4)} activeOpacity = {0.75} style={styles.bottomButton}>
      {state == EMAIL_STATE && <Image style={styles.icon} source={require('./assets/TUuser.png')} />}
      {state != EMAIL_STATE && <Image style={styles.icon} source={require('./assets/TUicon.png')} />}
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

const MapPane= () => (
  <View style={styles.mapPane}>
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
    backgroundColor: TU_BLUE,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  bottomButton: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 5
  },
  icon: {
    height: 50,
    width: 50,
    alignItems: 'center',
    padding: 5
  },
  classesButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: 200,
    borderRadius: 4,
    borderWidth: 1,
    elevation: 3,
    backgroundColor: 'white',
    borderColor: '#000',
  },
});