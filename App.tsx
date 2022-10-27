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
  
  const changeImage = () => {
    setInvImage(invImage => !invImage);
  }

  return (
    <View style={{flex: 1, backgroundColor: TU_BLUE}}>
      <View style={{paddingTop:20, padding: 5}}>
        <Image
          style={{width: 50, height: 50}}
          source={require('./assets/TUlogo.png')}
        />
        <Button
          title="Press me"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
      </View>
      <View style={{flex: 1}}>
        <StatusBar style="light"/>
        <ClassesPane></ClassesPane>
        <BottomButtons onPress={changeImage} invImage={invImage}></BottomButtons>
      </View>
    </View>
  );
}


const BottomButtons = (props: any) => (
  <View style={styles.bottomButtons}>
    <TouchableOpacity onPress={props.onPress} activeOpacity = {0.75} style={{padding: 5}}>
      {props.invImage && <Image style={{width: 50, height: 50}} source={require('./assets/TUmap.png')} />}
      {!props.invImage && <Image style={{width: 50, height: 50}} source={require('./assets/TUmapinv.png')} />}
    </TouchableOpacity>
  </View>
);

const ClassesPane = () => (
  <View style={styles.classesPane}>
    {/* <Text style={{color: 'green'}}>{"test"}</Text> */}
    {/* <View style={styles.classesButton}> */}
    {/* </View> */}
  </View>
);

const styles = StyleSheet.create({
  classesPane: {
    flex: 9,
    backgroundColor: LIGHT_BLUE,
  },
  bottomButtons: {
    flex: 1,
    backgroundColor: TU_BLUE,
    alignItems: 'center'
  },
  mainPane: {
    bottom: 0,
    position: 'absolute',
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