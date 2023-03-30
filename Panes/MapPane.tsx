import React, { useState, useEffect} from 'react';
import {Location, Location_Data} from '../Database/Location'
import {View, TextInput, StyleSheet, Button} from 'react-native';
import MapView, { Marker, LatLng, Polygon} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_API_KEY} from '../creds';
import {DARK_BLUE, TU_LIGHT_BLUE, styles} from './PaneStyles';
import { buildingMap, Building, BuildingList , BuildingData} from '../buildings/Polygons';
import {Image} from 'react-native' ; 
import buildingInfo from '../CONFIGS.json';

const MapPane=() => {
  //State for all of the data(titles, latitude/longitude, description) for all markers on map
  const [markerData, setMarkerData] = useState<Location_Data[]>([]);
  
  const [buildings, setBuildings] = useState<BuildingData[]>(buildingMap);
  const [buildingData, setBuildingData] = useState<BuildingData>({name: "", color: 'black', coords: [], tags: ['']});
  
  const [formVisible, setFormVisible] = useState<boolean>(false);
  
  //State for the origin marker.
  const [origin, setOrigin] = useState<Location_Data>(
    {} as Location_Data
    );
    
    //State for the destination marker
    const [destination, setDestination] = useState<Location_Data>(
      {} as Location_Data
      );
      
      const [currentTag, setCurrentTag] = useState<string>("all");
      
      function tag(input: string) {
        const buildingsWithTag: BuildingData[] = []
        buildingMap.forEach( (building) => {
          for (var val of building.tags) {
            if (val.startsWith(input)) {
              buildingsWithTag.push(building);
            }
          }
          // if (building.tags.find(element => element == input)) {
          //   buildingsWithTag.push(building);
          // }
        })
        setBuildings(buildingsWithTag);
      }
      
      useEffect(() => {
        Location.queryAttributes_Tag(currentTag).then((value:Location_Data[]) => {
          setMarkerData(value);
    });
  }, [currentTag]);
  
  return(
    <View style={styles.mapPane}>
      <View style={{padding:5, paddingBottom:10, height: 50}}>
        <TextInput onSubmitEditing={
          (e) => {
            const tagInput: string = e.nativeEvent.text.toLowerCase();
            setCurrentTag(tagInput);
            tag(tagInput);
          }}
          autoCorrect={false}
        style={{fontSize: 25, height: 30, backgroundColor: DARK_BLUE, flex: 1}}>
        </TextInput>
      </View>

      <MapView 
          showsBuildings={false}
          showsPointsOfInterest={false}
          showsUserLocation={true}
          initialRegion={{
            latitude: 36.15236,
            longitude: -95.94575,
            latitudeDelta: 0.01,
            longitudeDelta: 0.0125,}} 
          style = {{height: '100%', width: '100%'}}
          userInterfaceStyle={'light'}
          onLongPress = {(e) => {
            const location: LatLng = e.nativeEvent.coordinate
            setOrigin(destination)
            setDestination({
              Latitude: location.latitude, 
              Longitude: location.longitude
            } as Location_Data)
          }}>
            {/* <Building 
                name={"Keplinger Hall"}
                color={'green'} 
                coords={[
                    {latitude: 36.154399370636966, longitude: -95.94231245481298},{latitude: 36.154399370636966, longitude: -95.94184588923831},{latitude: 36.1537623145845, longitude: -95.94185726888648},
                    {latitude: 36.153658179929934, longitude: -95.94173209275668},{latitude: 36.15346216138149, longitude: -95.94173209275668},{latitude: 36.15345909858778, longitude: -95.94219107189925},{latitude: 36.15367043107294, longitude: -95.94220624476347},
                    {latitude: 36.15377150292973, longitude: -95.94231245481298}
                ]}
              /> */}
            <BuildingList
              visible={formVisible}
              setVisible={setFormVisible}
              buildingData={buildingData}
            />

            {buildings.map((item: BuildingData, index:number) => (
              <Building
                key={index}
                name={item.name}
                color={item.color}
                coords={item.coords}
                visible={formVisible}
                setVisible={setFormVisible}
                setData={setBuildingData}
              />
              )
            )}

            {/* {markerMap.map((item: Location_Data, index:number) => (
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
            ))} */}

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
          
          {/* OG Markers */}
            {/* {markerData.map((item: Location_Data, index:number) => (
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
            ))} */}

            {/* Event Marker */}
            {/* <Marker
              coordinate={{latitude: 36.153627613433635, longitude: -95.94216178640234}}
            >
              <Image
                source={require('./../assets/EventPinBlueLow.png')}
                style={{width: 100, height: 50}}
              />
            </Marker> */}
            {/* <Marker
              coordinate={{latitude: 36.15026436953065, longitude: -95.9498320731494}}
            >
              <Image
                source={require('./../assets/tennisicon.png')}
                style={{width: 50, height: 50}}
              />
            </Marker>
            <Marker
              coordinate={{latitude: 36.15021577749672, longitude: -95.94836774410652}}
            >
              <Image
                source={require('./../assets/foodicon.png')}
                style={{width: 50, height: 50}}
              />
            </Marker>
            <Marker
              coordinate={{latitude: 36.14893617641329, longitude: -95.9421894788685}}
            >
              <Image
                source={require('./../assets/basketballicon.png')}
                style={{width: 50, height: 50}}
              />
            </Marker> */}
      </MapView> 
    </View>
  );
}

export default MapPane;