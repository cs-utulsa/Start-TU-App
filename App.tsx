import React, { useState, useEffect, Dispatch } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, TouchableOpacity, Switch, TextInput} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { getTokenSourceMapRange, isPropertySignature, setTextRange } from 'typescript';

//Dependencies that interface with SQLite database
import {Person, Person_Data} from './Database/Person';
import {Location, Location_Data} from './Database/Location';
import { Event, Event_Data} from './Database/Event';
import { downloadDatabase_Expo_To_Machine } from './Database/Utilities'
import { populate } from './Database/Populate_DB';

//Dependencies for the Map Pane
import { RoutingPopup } from './PaneComponents/MapPaneComponents/RoutingPopup';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from 'react-native-maps';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './tsx-files/LoginScreen';
import MainPage from './tsx-files/LoginScreen';

//Dependencies for the Calendar Pane.
import { Agenda, AgendaSchedule} from 'react-native-calendars';
import { EventView } from './PaneComponents/CalendarPaneComponents/EventView';
import { formatAgendaSchedule } from './utilities/formatAgendaSchedule'

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

const { Navigator, Screen } = createStackNavigator()
//A VALID API KEY IS NEEDED
import {GOOGLE_MAPS_API_KEY} from './creds';
import { Header } from './Components/Header';

export default function App() {
  const[paneState, setPaneState] = useState(MAP_STATE);

  useEffect(() => {
    populate();
    //downloadDatabase_Expo_To_Machine();
  }, []);
  

  return (
    <NavigationContainer>
        <Navigator initialRouteName = "login">
            <Screen name = "login" component = {LoginPage}></Screen>
            <Screen name = "main" component = {MainPage}></Screen>
        </Navigator>
    </NavigationContainer>
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

const EmailPane = () => (
  <View style={styles.emailPane}>
    <Image style={{aspectRatio: 0.63, height: 595}} source={require('./assets/Outlook.png')} />
  </View>
);

const ClassesPane = () => (
  <View style={styles.classesPane}>
    <Image style={{aspectRatio: 0.63, height: 595}} source={require('./assets/Harvey.png')} />
  </View>
);

const MapPane = () => {

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
              description={item.Description}>
              </Marker>
            ))}
      </MapView> 
    </View>
  );
}

const CalenderPane = () => {

  const [agendaItems, setItems] = useState<AgendaSchedule>(
    {} as AgendaSchedule
  );

  return (
  <View style={styles.calenderPane}>
    <Agenda
      items={agendaItems}
      // Callback that gets called when items for a certain month should be loaded (month became visible)
      loadItemsForMonth={month => {
        const currMonth = month.month;
        const currYear = month.year;

        Event.queryAttributes_MonthYear(currMonth, currYear).then((value: Event_Data[]) => {
          setItems(formatAgendaSchedule(value)); 
        });
      }}

      renderItem = { (item) => {
        return <EventView 
                Name={item.name} Height={item.height} Day={item.day}></EventView>
      }}

      style={{height: '100%', width: '100%'}}

    ></Agenda>
  </View>)
};



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
    backgroundColor: 'white',
    paddingLeft: 3
  },
  emailPane: {
    flex: 9,
    backgroundColor: LIGHT_BLUE,
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