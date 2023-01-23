import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, TouchableOpacity, Switch, TextInput } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { getTokenSourceMapRange, isPropertySignature, setTextRange } from 'typescript';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import styles from './PaneStyles';



const MapPane= () => (
    <View style={styles.mapPane}>
      <MapView 
        initialRegion={{
          latitude: 36.15236,
          longitude: -95.94575,
          latitudeDelta: 0.01,
          longitudeDelta: 0.0125,}} 
        style = {{height: '100%', width: '100%'}}>
      <Marker
        key={"Ben"}
        coordinate={{latitude: 36.15397648540907, longitude: -95.94203871549036}}
        title={"Ben's Marker"}
        description={"This is where Ben's Marker is"}
      />
      </MapView> 
    </View>
  );

  export default MapPane;