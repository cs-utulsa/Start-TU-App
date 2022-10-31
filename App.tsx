import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, TouchableOpacity, Switch } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { getTokenSourceMapRange, isPropertySignature } from 'typescript';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import logo from './assets/icon.png';

const TU_GOLD = '#C2A01E'
const TU_BLUE = '#102240'
var mapImageType = 0
// const images = {
//   mainButtons: {
//     // map: require('./assets/TUmap.png'),
//   },
// };
const invert = () => mapImageType = 1;


export default function App() {
  return (
    <View style={{flex: 1, backgroundColor: TU_BLUE}}>
      <MapView style={{height: '50%', width: '100%'}}/> 
      <View style={{paddingTop:20, padding: 5}}>
        <Text> Icon </Text>
      </View>
      <View style={{flex: 1}}>
        <StatusBar style="light"/>
        <Text> Hello</Text>
      </View>
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
