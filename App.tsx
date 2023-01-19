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
import MapView, { Polygon, Marker, Overlay, PROVIDER_GOOGLE, LatLng } from 'react-native-maps';

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

//A VALID API KEY IS NEEDED
import {GOOGLE_MAPS_API_KEY} from './creds';

export default function App() {
  const[paneState, setPaneState] = useState(MAP_STATE);

  useEffect(() => {
    populate();
    //downloadDatabase_Expo_To_Machine();
  }, []);
  

  return (
    <View style={{flex: 1, backgroundColor: TU_BLUE}}>
      <View style={{padding: 0}}>
      </View>
      <View style={{flex: 1}}>
        <StatusBar style="light"/>
      <View style={{paddingTop:20}}>
        <Image
          style={{width: 50, height: 50}}
          source={require('./assets/TUlogonormal.png')}
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
            {/* <Overlay bounds={[[36.15346419599191, -95.94231100530232], [36.154378406934384, -95.94173811852323]]} image={require('./assets/Kep.png')} opacity={1} tappable={true} onPress={() => console.log("hello")}/> */}
            <Polygon fillColor={TU_LIGHT_BLUE} coordinates={[{latitude: 36.154399370636966, longitude: -95.94231245481298},{latitude: 36.154399370636966, longitude: -95.94184588923831},{latitude: 36.1537623145845, longitude: -95.94185726888648},
              {latitude: 36.153658179929934, longitude: -95.94173209275668},{latitude: 36.15346216138149, longitude: -95.94173209275668},{latitude: 36.15345909858778, longitude: -95.94219107189925},{latitude: 36.15367043107294, longitude: -95.94220624476347},
              {latitude: 36.15377150292973, longitude: -95.94231245481298}]}/>
            <Polygon fillColor={TU_LIGHT_BLUE} coordinates={[{latitude: 36.153297704044455, longitude: -95.94231961606665}, {latitude: 36.15329588289261, longitude: -95.94222263129699}, {latitude: 36.153281313676366, longitude: -95.94222263129699}, 
              {latitude: 36.153281313676366, longitude: -95.94178845529312}, {latitude: 36.153253996388656, longitude: -95.94178845529312}, {latitude: 36.15325217523579, longitude: -95.94177492253456 }, {latitude: 36.15318934543643, longitude: -95.94177492253456}, 
              {latitude: 36.15317659735504, longitude: -95.94178732756325}, {latitude: 36.15304911642732, longitude: -95.94178507210349}, {latitude: 36.15304911642732, longitude: -95.94180762670109}, {latitude: 36.152961700814224, longitude: -95.94191250557994}, 
              {latitude: 36.15293620457538, longitude: -95.94191250557994}, {latitude: 36.152937115155495, longitude: -95.94220120442925}, {latitude: 36.15292527761334, longitude: -95.9421989489695}, {latitude: 36.15292800935401, longitude: -95.94226886822204}, 
              {latitude: 36.15293620457538, longitude: -95.94226886822204}, {latitude: 36.15293529399528, longitude: -95.94231736060689}, {latitude: 36.15320937813155, longitude: -95.94231848833678}, {latitude: 36.15320937813155, longitude: -95.94233540428499}, 
              {latitude: 36.15328313482854, longitude: -95.94233653201488}, {latitude: 36.153284955980695, longitude: -95.94231961606665}]}/>
            <Polygon strokeWidth={0.1} fillColor='red' coordinates={[{latitude: 36.153546719983936, longitude: -95.94900305303992}, {latitude: 36.15354518858874, longitude: -95.94890063620645}, {latitude: 36.15353446882159, longitude: -95.94889873959843}, 
              {latitude: 36.153532937426164, longitude: -95.94869959575558}, {latitude: 36.153546719983936, longitude: -95.94869959575558}, {latitude: 36.15354518858874, longitude: -95.94860097213818}, {latitude: 36.153520686261686, longitude: -95.94860286874619}, 
              {latitude: 36.153519154865975, longitude: -95.94856303997763}, {latitude: 36.153428802467005, longitude: -95.9485611433696}, {latitude: 36.15342573967201, longitude: -95.94860097213818}, {latitude: 36.153229720542534, longitude: -95.94859717892213}, 
              {latitude: 36.15322665773975, longitude: -95.94862562804252}, {latitude: 36.15318224708592, longitude: -95.94862562804252}, {latitude: 36.15318224708592, longitude: -95.94860476535422}, {latitude: 36.153090362894694, longitude: -95.94860286874619}, 
              {latitude: 36.15308883149059, longitude: -95.9485611433696}, {latitude: 36.153049780675985, longitude: -95.94856168227074}, {latitude: 36.153050546378424, longitude: -95.94853323315034}, {latitude: 36.15316157315231, longitude: -95.94853418145435}, 
              {latitude: 36.15316157315231, longitude: -95.94840900532455}, {latitude: 36.153049780675985, longitude: -95.94840426380449}, {latitude: 36.153047483568635, longitude: -95.94838624602825}, {latitude: 36.152935690929674, longitude: -95.94838529772424}, 
              {latitude: 36.1529310967081, longitude: -95.94897893607212}, {latitude: 36.1529456450751, longitude: -95.94897988437614}, {latitude: 36.15294411366817, longitude: -95.94902824788083}, {latitude: 36.1530122612474, longitude: -95.94902824788083}, 
              {latitude: 36.1530122612474, longitude: -95.94899410893635}, {latitude: 36.15319449830318, longitude: -95.94899410893635}, {latitude: 36.15319373260214, longitude: -95.9490329894009}, {latitude: 36.15327413116939, longitude: -95.94903014448884}, 
              {latitude: 36.15327477376571, longitude: -95.94899430231948}, {latitude: 36.153423508656935, longitude: -95.94899589717153}, {latitude: 36.153422220910194, longitude: -95.94903098389113}, {latitude: 36.15352008960253, longitude: -95.94903018646569}, 
              {latitude: 36.153520733475084, longitude: -95.94899988429876}]} 
              holes={[[{latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153412562806324, longitude: -95.94872716477444}, 
                {latitude: 36.15321360565575, longitude: -95.94872397507265}, {latitude: 36.15321231790557, longitude: -95.94868490122583}, {latitude: 36.15315758850287, longitude: -95.94868809092762}, {latitude: 36.153155656876194, longitude: -95.94865380163345},
                {latitude: 36.15308740603646, longitude: -95.948653004208}, {latitude: 36.1530861182842, longitude: -95.94869925488385}, {latitude: 36.153053280594335, longitude: -95.9486984574584}, {latitude: 36.153053280594335, longitude: -95.9488435888895}]]}
            />
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