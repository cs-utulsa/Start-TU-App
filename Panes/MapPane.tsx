import React, { useState, useEffect} from 'react';
import {Location, Location_Data} from '../Database/Location'
import {View, TextInput, StyleSheet} from 'react-native';
import MapView, { Marker, LatLng } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_API_KEY} from '../creds';
import {DARK_BLUE, TU_LIGHT_BLUE, styles} from './PaneStyles';
import { BuildingList } from '../buildings/Polygons';
import {Image} from 'react-native' ; 


const MapPane= () => {
  //State for all of the data(titles, latitude/longitude, description) for all markers on map
  const [markerData, setMarkerData] = useState<Location_Data[]>([]);
    
  //State for the origin marker.
  const [origin, setOrigin] = useState<Location_Data>(
    {} as Location_Data
  );

  //State for the destination marker
  const [destination, setDestination] = useState<Location_Data>(
    {} as Location_Data
  );

  const [currentTag, setCurrentTag] = useState<string>("all");

  
  useEffect(() => {
    Location.queryAttributes_Tag(currentTag).then((value:Location_Data[]) => {
      setMarkerData(value);
    });
  }, [currentTag]);
  
  const updateDirectionEndpoints = (newOrigin: Location_Data, newDestination: Location_Data) => {
    setOrigin(newOrigin);
    setDestination(newDestination);
  };

  
  return(
    <View style={styles.mapPane}>
      <View style={{padding:5, paddingBottom:10, height: 50}}>
        <TextInput onSubmitEditing={
          (e) => {
            const tagInput: string = e.nativeEvent.text.toLowerCase();
            setCurrentTag(tagInput);
          }}
          autoCorrect={false}
        style={{fontSize: 25, height: 30, backgroundColor: DARK_BLUE, flex: 1}}>
        </TextInput>
      </View>

      <MapView 
          showsBuildings={false}
          showsPointsOfInterest={false}
          initialRegion={{
            latitude: 36.15236,
            longitude: -95.94575,
            latitudeDelta: 0.01,
            longitudeDelta: 0.0125,}} 
          style = {{height: '100%', width: '100%'}}
          onLongPress = {(e) => {
            const location: LatLng = e.nativeEvent.coordinate
            setOrigin(destination)
            setDestination({
              Latitude: location.latitude, 
              Longitude: location.longitude
            } as Location_Data)
          }}>

            <BuildingList></BuildingList>

            { 
              JSON.stringify(origin) != '{}' && 
              JSON.stringify(destination) != '{}' &&

              <MapViewDirections
              origin={{latitude: origin.Latitude, longitude: origin.Longitude}}
              destination={{latitude: destination.Latitude, longitude: destination.Longitude}}
              apikey={GOOGLE_MAPS_API_KEY}
              mode={"WALKING"}
              strokeColor={TU_LIGHT_BLUE}
              strokeWidth={3}/>
            }

            {
              JSON.stringify(origin) != '{}' &&
              <Marker coordinate={{latitude: origin.Latitude, longitude: origin.Longitude}} pinColor={'blue'}></Marker>
            }
              
            {
              JSON.stringify(destination) != '{}' &&
              <Marker coordinate={{latitude: destination.Latitude, longitude: destination.Longitude}} pinColor={'green'}></Marker>
            }
          
            {markerData.map((item: Location_Data, index:number) => (
              <Marker
                key={index}
                coordinate={{latitude: item.Latitude, longitude: item.Longitude}}
                title={item.Name}
                description={item.Description}
              >
                <Image
                  source={require('./../assets/Location-Marker.png')}
                  style={{width: 26, height: 28}}
                />
              </Marker>
            ))}
            <Marker
              coordinate={{latitude: 36.153627613433635, longitude: -95.94216178640234}}
            >
              <Image
                source={require('./../assets/EventPinBlueLow.png')}
                style={{width: 100, height: 50}}
              />
            </Marker>
      </MapView> 
    </View>
  );
}

export default MapPane;