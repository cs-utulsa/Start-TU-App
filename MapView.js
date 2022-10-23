/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Dimensions,
   Text,
   View
 } from 'react-native';
 
 import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
 
 const { width, height } = Dimensions.get('window');
 
 const ASPECT_RATIO = width / height;
 const LATITUDE = 37.78825;
 const LONGITUDE = -122.4324;
 const LATITUDE_DELTA = 0.0922;
 const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
 
 
 class GoogleMapPlayground extends React.Component {
   constructor(props) {
     super(props);
 
     this.state = {
     };
   }
 
   render() {
     return (
       <View style={{ flex: 1 }}>
         <View style={{ backgroundColor: 'green', height: 100, justifyContent: 'center', alignItems: 'center'}}>
           <Text>Some div</Text>
         </View>
         <View style={styles.container}>
           <MapView
             provider={PROVIDER_GOOGLE}
             style={styles.map}
             initialRegion={{
               latitude: LATITUDE,
               longitude: LONGITUDE,
               latitudeDelta: LATITUDE_DELTA,
               longitudeDelta: LONGITUDE_DELTA,
             }}
           />
         </View>
       </View>
     );
   }
 }
 
 GoogleMapPlayground.propTypes = {
   provider: MapView.ProviderPropType,
 };
 
 const styles = StyleSheet.create({
   container: {
     ...StyleSheet.absoluteFillObject,
     top: 100,
     justifyContent: 'flex-end',
     alignItems: 'center'
   },
   map: {
      ...StyleSheet.absoluteFillObject,
   },
 });
 
 AppRegistry.registerComponent('GoogleMapPlayground', () => GoogleMapPlayground);