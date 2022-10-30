<<<<<<< Updated upstream
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
=======
import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, TouchableOpacity, Switch } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { getTokenSourceMapRange, isPropertySignature } from 'typescript';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import logo from './assets/icon.png';

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

>>>>>>> Stashed changes

export default function App() {
  return (
<<<<<<< Updated upstream
    <View style={styles.container}>
      <Text>Start of TU APP. This is our senior project for 2022-2023.</Text>
      <StatusBar style="auto" />
=======
    <View style={{flex: 1, backgroundColor: TU_BLUE}}>
      <MapView style={{height: '50%', width: '100%'}}/> 
      <View style={{paddingTop:20, padding: 5}}>
        <Image
          style={{width: 50, height: 50}}
          source={require('./assets/TUlogo.png')}
        />
      </View>
      <View style={{flex: 1}}>
        <StatusBar style="light"/>
        <ClassesPane></ClassesPane>
        <BottomButtons onPress={changeImage} invImage={invImage}></BottomButtons>
      </View>
>>>>>>> Stashed changes
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
