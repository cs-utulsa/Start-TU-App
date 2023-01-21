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
import {BuildingList} from './buildings/Polygons';

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
const DORM_COLOR = '#103cab'
const APT_COLOR = '#4D81F0'
const EDUC_COLOR = '#ff4040'
const ADMIN_COLOR = '#930700'
const SPORTS_COLOR = '#E3c759'
const PRAY_COLOR = '#9EAFB1'
const FRAT_COLOR = '#89CFF0'
const SORO_COLOR = '#F4C2C2'
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
            {/* Keplinger Hall */}
            <Polygon fillColor={EDUC_COLOR} 
              coordinates={[
                {latitude: 36.154399370636966, longitude: -95.94231245481298},{latitude: 36.154399370636966, longitude: -95.94184588923831},{latitude: 36.1537623145845, longitude: -95.94185726888648},
                {latitude: 36.153658179929934, longitude: -95.94173209275668},{latitude: 36.15346216138149, longitude: -95.94173209275668},{latitude: 36.15345909858778, longitude: -95.94219107189925},{latitude: 36.15367043107294, longitude: -95.94220624476347},
                {latitude: 36.15377150292973, longitude: -95.94231245481298}
              ]}
              holes={[[
                {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
              ]]}
            />

            {/* Rayzor Hall */}
            <Polygon 
              fillColor={EDUC_COLOR} 
              coordinates={[
                {latitude: 36.153297704044455, longitude: -95.94231961606665}, {latitude: 36.15329588289261, longitude: -95.94222263129699}, {latitude: 36.153281313676366, longitude: -95.94222263129699}, 
                {latitude: 36.153281313676366, longitude: -95.94178845529312}, {latitude: 36.153253996388656, longitude: -95.94178845529312}, {latitude: 36.15325217523579, longitude: -95.94177492253456 }, {latitude: 36.15318934543643, longitude: -95.94177492253456}, 
                {latitude: 36.15317659735504, longitude: -95.94178732756325}, {latitude: 36.15304911642732, longitude: -95.94178507210349}, {latitude: 36.15304911642732, longitude: -95.94180762670109}, {latitude: 36.152961700814224, longitude: -95.94191250557994}, 
                {latitude: 36.15293620457538, longitude: -95.94191250557994}, {latitude: 36.152937115155495, longitude: -95.94220120442925}, {latitude: 36.15292527761334, longitude: -95.9421989489695}, {latitude: 36.15292800935401, longitude: -95.94226886822204}, 
                {latitude: 36.15293620457538, longitude: -95.94226886822204}, {latitude: 36.15293529399528, longitude: -95.94231736060689}, {latitude: 36.15320937813155, longitude: -95.94231848833678}, {latitude: 36.15320937813155, longitude: -95.94233540428499}, 
                {latitude: 36.15328313482854, longitude: -95.94233653201488}, {latitude: 36.153284955980695, longitude: -95.94231961606665}
              ]}
              holes={[[
                {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
              ]]}
            />
      
            {/* John Mabee Hall */}
            <Polygon 
              strokeWidth={0.00001} 
              fillColor={DORM_COLOR} 
              coordinates={[
                {latitude: 36.153546719983936, longitude: -95.94900305303992}, {latitude: 36.15354518858874, longitude: -95.94890063620645}, {latitude: 36.15353446882159, longitude: -95.94889873959843}, 
                {latitude: 36.153532937426164, longitude: -95.94869959575558}, {latitude: 36.153546719983936, longitude: -95.94869959575558}, {latitude: 36.15354518858874, longitude: -95.94860097213818}, {latitude: 36.153520686261686, longitude: -95.94860286874619}, 
                {latitude: 36.153519154865975, longitude: -95.94856303997763}, {latitude: 36.153428802467005, longitude: -95.9485611433696}, {latitude: 36.15342573967201, longitude: -95.94860097213818}, {latitude: 36.153229720542534, longitude: -95.94859717892213}, 
                {latitude: 36.15322665773975, longitude: -95.94862562804252}, {latitude: 36.15318224708592, longitude: -95.94862562804252}, {latitude: 36.15318224708592, longitude: -95.94860476535422}, {latitude: 36.153090362894694, longitude: -95.94860286874619}, 
                {latitude: 36.15308883149059, longitude: -95.9485611433696}, {latitude: 36.153049780675985, longitude: -95.94856168227074}, {latitude: 36.153050546378424, longitude: -95.94853323315034}, {latitude: 36.15316157315231, longitude: -95.94853418145435}, 
                {latitude: 36.15316157315231, longitude: -95.94840900532455}, {latitude: 36.153049780675985, longitude: -95.94840426380449}, {latitude: 36.153047483568635, longitude: -95.94838624602825}, {latitude: 36.152935690929674, longitude: -95.94838529772424}, 
                {latitude: 36.1529310967081, longitude: -95.94897893607212}, {latitude: 36.1529456450751, longitude: -95.94897988437614}, {latitude: 36.15294411366817, longitude: -95.94902824788083}, {latitude: 36.1530122612474, longitude: -95.94902824788083}, 
                {latitude: 36.1530122612474, longitude: -95.94899410893635}, {latitude: 36.15319449830318, longitude: -95.94899410893635}, {latitude: 36.15319373260214, longitude: -95.9490329894009}, {latitude: 36.15327413116939, longitude: -95.94903014448884}, 
                {latitude: 36.15327477376571, longitude: -95.94899430231948}, {latitude: 36.153423508656935, longitude: -95.94899589717153}, {latitude: 36.153422220910194, longitude: -95.94903098389113}, {latitude: 36.15352008960253, longitude: -95.94903018646569}, 
                {latitude: 36.153520733475084, longitude: -95.94899988429876}
              ]} 
              // holes={[[
              //   {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153412562806324, longitude: -95.94872716477444}, 
              //   {latitude: 36.15321360565575, longitude: -95.94872397507265}, {latitude: 36.15321231790557, longitude: -95.94868490122583}, {latitude: 36.15315758850287, longitude: -95.94868809092762}, {latitude: 36.153155656876194, longitude: -95.94865380163345},
              //   {latitude: 36.15308740603646, longitude: -95.948653004208}, {latitude: 36.1530861182842, longitude: -95.94869925488385}, {latitude: 36.153053280594335, longitude: -95.9486984574584}, {latitude: 36.153053280594335, longitude: -95.9488435888895}
              // ]]}
                holes={[[
                  {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
                ]]}
            />

            {/* Champman Hall */}
            <Polygon 
              strokeWidth={0.00001} 
              fillColor={EDUC_COLOR} 
              coordinates={[
                {latitude: 36.15336590133616, longitude: -95.9478298788146}, 
                {latitude: 36.15336590133616, longitude: -95.9476291603481}, {latitude: 36.15291428294748, longitude: -95.94762426477575}, 
                {latitude: 36.15291131826674, longitude: -95.94782620713534}, {latitude: 36.15303484653547, longitude: -95.94783232660076},
                {latitude: 36.15303385831008, longitude: -95.94803671674651}, {latitude: 36.152961717823885, longitude: -95.94803426896036},
                {latitude: 36.15296270605016, longitude: -95.94821907681668}, {latitude: 36.15319493888226, longitude: -95.94821662903051},
                {latitude: 36.15320086822214, longitude: -95.94814564323138}, {latitude: 36.15321766801611, longitude: -95.94814319544521},
                {latitude: 36.153219644462204, longitude: -95.94815421048301}, {latitude: 36.153269055598784, longitude: -95.94814319544521},
                {latitude: 36.15328289071145, longitude: -95.94814074765902}, {latitude: 36.15328432284544, longitude: -95.94811032941848}, 
                {latitude: 36.153269704186556, longitude: -95.94810496500028}, {latitude: 36.153219892438884, longitude: -95.94811167052237},
                {latitude: 36.15319769371504, longitude: -95.94811032941794}, {latitude: 36.15319606941793, longitude: -95.94803723922716}, 
                {latitude: 36.15312351744584, longitude: -95.94803723922023}, {latitude: 36.15312460031161, longitude: -95.94782735637882}, 
                {latitude: 36.15329840007175, longitude: -95.94782802692778}, {latitude: 36.153295151481665, longitude: -95.94792592755029}, 
                {latitude: 36.15333034453379, longitude: -95.9479265981025}, {latitude: 36.15333088596521, longitude: -95.94782802692778}
              ]}
              holes={[[
                {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
              ]]}
            />

            {/* Mary K. Chapman Center */}
            <Polygon 
            strokeWidth={0.1}
              coordinates={[
                {latitude: 36.15352176536669, longitude: -95.94844568202697}, 
                {latitude: 36.15352176536669, longitude: -95.94799257498467}, {latitude: 36.15345369903913, longitude: -95.94798956430665}, 
                {latitude: 36.153451268097754, longitude: -95.9480106390528}, {latitude: 36.15341601943953, longitude: -95.94801214439183}, 
                {latitude: 36.153414803968275, longitude: -95.94803020845994}, {latitude: 36.153386848124185, longitude: -95.94803020845994}, 
                {latitude: 36.153381986237235, longitude: -95.94829213744785}, {latitude: 36.153270162754296, longitude: -95.94829063210882}, 
                {latitude: 36.1532713782278, longitude: -95.9483794471105}, {latitude: 36.15329811863999, longitude: -95.9483794471105}, 
                {latitude: 36.15329933411306, longitude: -95.94840052185664}, {latitude: 36.153326074515704, longitude: -95.94840353253467}, 
                {latitude: 36.15332850546095, longitude: -95.94842159660281}, {latitude: 36.15335281490924, longitude: -95.94842159660281}, 
                {latitude: 36.15335646132582, longitude: -95.94844417668796}
              ]}
              holes={[[
                {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
              ]]}
            />

            {/* Pike */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={DORM_COLOR}
              coordinates={[
                {latitude: 36.15116685117342, longitude: -95.94423022653353}, {latitude: 36.151170564386845, longitude: -95.94372207952603}, 
                {latitude: 36.15105081316508, longitude: -95.94372552848762}, {latitude: 36.151046171641184, longitude: -95.94392211929821}, 
                {latitude: 36.15101089605051, longitude: -95.94392211929821}, {latitude: 36.15101182435575, longitude: -95.94403248606906}, 
                {latitude: 36.151051741469814, longitude: -95.94403248606906}, {latitude: 36.151051741469814, longitude: -95.9442279272258}
              ]}
              holes={[[
                {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
              ]]}
            />

            {/* McClure */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={ADMIN_COLOR}
              coordinates={[{latitude: 36.151336598493224, longitude: -95.94743438829745}, {latitude: 36.15133730404892, longitude: -95.94715826916898}, 
                {latitude: 36.15114186488037, longitude: -95.94715739537425}, {latitude: 36.15114115932294, longitude: -95.94714865742716}, 
                {latitude: 36.15106989798803, longitude: -95.94714778363243}, {latitude: 36.15106778131373, longitude: -95.94725788176596}, 
                {latitude: 36.15098805320587, longitude: -95.94725788176584}, {latitude: 36.1509852309705, longitude: -95.94758555478221}, 
                {latitude: 36.151137631534766, longitude: -95.94758555478221}, {latitude: 36.15113833709225, longitude: -95.9475584671462}, 
                {latitude: 36.151158798257, longitude: -95.94755759335142}, {latitude: 36.151159503814284, longitude: -95.94743176691314}
              ]}
              holes={[[
                {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
              ]]}
            />

            {/* United Methodist Church */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={PRAY_COLOR}
            coordinates={[{latitude: 36.15416877898395, longitude: -95.94673030798657}, {latitude: 36.15417202387157, longitude: -95.9462781960352}, 
              {latitude: 36.15384104464297, longitude: -95.9462741772623}, {latitude: 36.15384266709358, longitude: -95.94622997076038}, 
              {latitude: 36.15378750375412, longitude: -95.94622796137395}, {latitude: 36.15378912620582, longitude: -95.94626011155715}, 
              {latitude: 36.15377290168717, longitude: -95.94626011155715}, {latitude: 36.15377127923514, longitude: -95.9464047873816}, 
              {latitude: 36.15378425885058, longitude: -95.9464047873816}, {latitude: 36.15378588130236, longitude: -95.94645703142929}, 
              {latitude: 36.15384428954413, longitude: -95.94645301265639}, {latitude: 36.15384428954413, longitude: -95.94639875922222}, 
              {latitude: 36.153990309958225, longitude: -95.94639875922222}, {latitude: 36.15398868751067, longitude: -95.94647712529381}, 
              {latitude: 36.15405196294031, longitude: -95.94647913468025}, {latitude: 36.15405358538654, longitude: -95.94659768848084}, 
              {latitude: 36.15377939149503, longitude: -95.94659567909437}, {latitude: 36.15378101394692, longitude: -95.94672628921367}
            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
            />

            {/* West Village 1 */}
            <Polygon
            strokeWidth={0.1}
            fillColor={APT_COLOR}
            coordinates={[{latitude: 36.154548880526676, longitude: -95.94881518718397}, {latitude: 36.15454647290945, longitude: -95.94869144110841}, 
              {latitude: 36.154530823395625, longitude: -95.94868995019185}, {latitude: 36.154530823395625, longitude: -95.94864969544437}, 
              {latitude: 36.15449591293044, longitude: -95.94864820452779}, {latitude: 36.154493505311564, longitude: -95.94867355010953}, 
              {latitude: 36.15433700992701, longitude: -95.94867056827637}, {latitude: 36.15433821373887, longitude: -95.94864969544437}, 
              {latitude: 36.15429728412585, longitude: -95.94864969544437}, {latitude: 36.15429608031339, longitude: -95.94868547744211}, 
              {latitude: 36.15426598499561, longitude: -95.94868547744211}, {latitude: 36.15426598499561, longitude: -95.9486526772775}, 
              {latitude: 36.15422866678552, longitude: -95.9486526772775}, {latitude: 36.15422625915845, longitude: -95.94867205919296}, 
              {latitude: 36.154070967056484, longitude: -95.94867205919296}, {latitude: 36.15406976324056, longitude: -95.94864671361121}, 
              {latitude: 36.15403124112055, longitude: -95.94864820452779}, {latitude: 36.15403244493709, longitude: -95.94867205919296}, 
              {latitude: 36.15401318387029, longitude: -95.94867056827637}, {latitude: 36.154016795320665, longitude: -95.94881667810053}, 
              {latitude: 36.15403244493709, longitude: -95.94881369626741}, {latitude: 36.15403244493709, longitude: -95.94885544193144}, 
              {latitude: 36.15407217087243, longitude: -95.94885544193144}, {latitude: 36.154074578504215, longitude: -95.94883755093255}, 
              {latitude: 36.15422866678552, longitude: -95.94884053276571}, {latitude: 36.15422866678552, longitude: -95.948856932848}, 
              {latitude: 36.15426718880853, longitude: -95.94886140559774}, {latitude: 36.15427080024723, longitude: -95.94881965993368}, 
              {latitude: 36.15429608031339, longitude: -95.94881965993368}, {latitude: 36.15429608031339, longitude: -95.94885842376459}, 
              {latitude: 36.15433941755067, longitude: -95.94885842376459}, {latitude: 36.15433941755067, longitude: -95.94883755093255}, 
              {latitude: 36.15449591293044, longitude: -95.94884053276571}, {latitude: 36.15449591293044, longitude: -95.94885842376459}, 
              {latitude: 36.154532027204475, longitude: -95.948856932848}, {latitude: 36.15453323101333, longitude: -95.94881518718397}
            ]}
              holes={[[
                {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
              ]]}
            />

            {/* West Village 2 */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={APT_COLOR}
            coordinates={[
              {latitude: 36.15398622032713, longitude: -95.9487682298253}, {latitude: 36.15398622032713, longitude: -95.94871123288843}, {latitude: 36.153968894663755, longitude: -95.948709891784}, {latitude: 36.15397214322592, longitude: -95.9485268310338}, 
              {latitude: 36.153985678900206, longitude: -95.94852750158601}, {latitude: 36.15398513747329, longitude: -95.94847922182771}, {latitude: 36.153954276132296, longitude: -95.9484798923799}, {latitude: 36.15395265185084, longitude: -95.94844032980019}, 
              {latitude: 36.153985678900206, longitude: -95.94843965924798}, {latitude: 36.15398513747329, longitude: -95.94838534451989}, {latitude: 36.15397701606894, longitude: -95.94838601507209}, {latitude: 36.153978098922906, longitude: -95.94820094266528}, 
              {latitude: 36.153985678900206, longitude: -95.94820161321748}, {latitude: 36.15398459604635, longitude: -95.94815132180258}, {latitude: 36.153953734705155, longitude: -95.94815132180258}, {latitude: 36.153953734705155, longitude: -95.94812986413221}, 
              {latitude: 36.15385140490792, longitude: -95.94813053468444}, {latitude: 36.153851946335756, longitude: -95.94815266290698}, {latitude: 36.15381783637392, longitude: -95.94815333345916}, {latitude: 36.15381783637392, longitude: -95.94819826045648}, 
              {latitude: 36.15383462064271, longitude: -95.94819691935207}, {latitude: 36.15383516207068, longitude: -95.94824050524501}, {latitude: 36.15382595779476, longitude: -95.94824050524501}, {latitude: 36.15382704065081, longitude: -95.94839205004189}, 
              {latitude: 36.15381729494583, longitude: -95.94839137948968}, {latitude: 36.15381837780201, longitude: -95.94843831814359}, {latitude: 36.1538486977686, longitude: -95.94843831814359}, {latitude: 36.15384978062434, longitude: -95.9484785512755}, 
              {latitude: 36.15381946065816, longitude: -95.94847922182771}, {latitude: 36.15382000208622, longitude: -95.94851878440741}, {latitude: 36.15382920636285, longitude: -95.94851945495961}, {latitude: 36.15383137207485, longitude: -95.94871659730602}, 
              {latitude: 36.15381891923007, longitude: -95.94871659730602}, {latitude: 36.15381891923007, longitude: -95.94876420651212}, {latitude: 36.153847073484975, longitude: -95.94876353595993}, {latitude: 36.153847073484975, longitude: -95.94878633473465}, 
              {latitude: 36.15387089630817, longitude: -95.94878767583907}, {latitude: 36.15387035488044, longitude: -95.94882254455338}, {latitude: 36.15393370189821, longitude: -95.94882187400118}, {latitude: 36.15393424332549, longitude: -95.94879639301763}, 
              {latitude: 36.15395265185084, longitude: -95.94879572246545}, {latitude: 36.15395265185084, longitude: -95.9487695709297}
            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
            />

            {/* West Village 3 */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={APT_COLOR}
            coordinates={[
              {latitude: 36.15453684958365, longitude: -95.94837863896831}, {latitude: 36.15453684958365, longitude: -95.94830018436109}, {latitude: 36.154541722391556, longitude: -95.94830018436109}, {latitude: 36.154541722391556, longitude: -95.94825190460278}, 
              {latitude: 36.154534142467995, longitude: -95.94825190460278}, {latitude: 36.154535766737396, longitude: -95.94817143833896}, {latitude: 36.1545233140045, longitude: -95.94817143833896}, {latitude: 36.154522772581274, longitude: -95.94813254631141}, 
              {latitude: 36.15453468389114, longitude: -95.94813254631141}, {latitude: 36.15453468389114, longitude: -95.94808292544873}, {latitude: 36.154529811082774, longitude: -95.94808426655314}, {latitude: 36.154530893929106, longitude: -95.94805811501739}, 
              {latitude: 36.15454118096848, longitude: -95.94805744446518}, {latitude: 36.154540639545374, longitude: -95.9480051413937}, {latitude: 36.15453468389114, longitude: -95.94800581194589}, {latitude: 36.15453522531427, longitude: -95.94792936899525}, 
              {latitude: 36.15452006546515, longitude: -95.94792869844305}, {latitude: 36.15452060688838, longitude: -95.94790724077271}, {latitude: 36.15441123931939, longitude: -95.9479058996683}, {latitude: 36.15440907362343, longitude: -95.94792869844305}, 
              {latitude: 36.15439228947758, longitude: -95.94792936899525}, {latitude: 36.1543906652052, longitude: -95.94800581194589}, {latitude: 36.15437442247968, longitude: -95.9480051413937}, {latitude: 36.15437388105543, longitude: -95.9480554328086}, 
              {latitude: 36.15439932799077, longitude: -95.9480540917042}, {latitude: 36.15439824514263, longitude: -95.94824922239398}, {latitude: 36.15437388105543, longitude: -95.94825056349839}, {latitude: 36.154373339631185, longitude: -95.94830018436109}, 
              {latitude: 36.154395538022214, longitude: -95.94830018436109}, {latitude: 36.1543960794463, longitude: -95.94833572362761}, {latitude: 36.15438633381207, longitude: -95.94833572362761}, {latitude: 36.15438633381207, longitude: -95.94837595675953}, 
              {latitude: 36.15440907362343, longitude: -95.94837662731173}, {latitude: 36.15440961504741, longitude: -95.94840143774309}, {latitude: 36.15452223115806, longitude: -95.94840277884747}, {latitude: 36.15452223115806, longitude: -95.94837863896831}
            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
            />

            {/* Helmerich Hall */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={EDUC_COLOR}
            coordinates={[
              {latitude: 36.15336869951875, longitude: -95.94748017613777}, {latitude: 36.153369610093826, longitude: -95.94727154610996}, {latitude: 36.15338235814382, longitude: -95.94727041838009}, {latitude: 36.153381447568904, longitude: -95.94723771421356}, 
              {latitude: 36.15339237446738, longitude: -95.94723658648367}, {latitude: 36.15339419561696, longitude: -95.9470820874901}, {latitude: 36.153334097657904, longitude: -95.9470820874901}, {latitude: 36.153334097657904, longitude: -95.9469749531515}, 
              {latitude: 36.153249414091945, longitude: -95.94697382542161}, {latitude: 36.153249414091945, longitude: -95.9468610524336}, {latitude: 36.15290885775284, longitude: -95.94686218016348}, {latitude: 36.15290885775284, longitude: -95.94707193792118}, 
              {latitude: 36.15303542832963, longitude: -95.94707306565105}, {latitude: 36.15303542832963, longitude: -95.94705051105346}, {latitude: 36.15315926696964, longitude: -95.94705163878334}, {latitude: 36.153158356392126, longitude: -95.94728958978806}, 
              {latitude: 36.15295529734072, longitude: -95.94728846205815}, {latitude: 36.15295438676083, longitude: -95.94750273073538}, {latitude: 36.15308459957776, longitude: -95.9475016030055}, {latitude: 36.15308551015614, longitude: -95.94747679294814}
            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
            />

            {/* Phillips Hall */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={EDUC_COLOR}
            coordinates={[
              {latitude: 36.15325578812487, longitude: -95.94659378040738}, {latitude: 36.15325396697206, longitude: -95.94634229664413}, {latitude: 36.15321116986878, longitude: -95.94634229664413}, {latitude: 36.15321025929188, longitude: -95.94628591015011}, 
              {latitude: 36.15302268022114, longitude: -95.94628478242024}, {latitude: 36.153021769642024, longitude: -95.94624080095493}, {latitude: 36.152867881620935, longitude: -95.9462419286848}, {latitude: 36.152867881620935, longitude: -95.94665580555079}, 
              {latitude: 36.15294437037923, longitude: -95.94667046603922}, {latitude: 36.153021769642024, longitude: -95.94665580555079}, {latitude: 36.15302359080023, longitude: -95.94656897035003}, {latitude: 36.15298079357123, longitude: -95.94656897035003}, 
              {latitude: 36.15298170415081, longitude: -95.94652611661459}, {latitude: 36.15309006304577, longitude: -95.9465249888847}, {latitude: 36.15309097362407, longitude: -95.94649905109745}, {latitude: 36.15310463229753, longitude: -95.94649792336757}, 
              {latitude: 36.1531064534538, longitude: -95.9464516864425}, {latitude: 36.15312921790375, longitude: -95.9464516864425}, {latitude: 36.15312830732587, longitude: -95.94659378040738}, {latitude: 36.15312011212457, longitude: -95.94659490813727}, 
              {latitude: 36.15312193328048, longitude: -95.94667046603922}, {latitude: 36.15324395063084, longitude: -95.94666821057947}, {latitude: 36.15324395063084, longitude: -95.94659265267751}
            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
            />

            {/* McFarlin Library */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={EDUC_COLOR}
            coordinates={[
              {latitude: 36.152543609995014, longitude: -95.94600479389928}, {latitude: 36.152543068558124, longitude: -95.94596389021518}, {latitude: 36.152533322693586, longitude: -95.94595047917122}, {latitude: 36.15253386413053, longitude: -95.9459276803965}, 
              {latitude: 36.152519245331554, longitude: -95.94592700984431}, {latitude: 36.152519245331554, longitude: -95.94589214113}, {latitude: 36.152532781256625, longitude: -95.94589214113}, {latitude: 36.152532781256625, longitude: -95.94586867180305}, 
              {latitude: 36.15254198568434, longitude: -95.9458592840723}, {latitude: 36.15254198568434, longitude: -95.94581905094041}, {latitude: 36.152532781256625, longitude: -95.94580631044866}, {latitude: 36.15253223981968, longitude: -95.94578284112173}, 
              {latitude: 36.15247701323033, longitude: -95.94578217056953}, {latitude: 36.15247647179298, longitude: -95.9457607128992}, {latitude: 36.152392548959625, longitude: -95.9457613834514}, {latitude: 36.152392548959625, longitude: -95.94575534848161}, 
              {latitude: 36.15209746473221, longitude: -95.94575668958618}, {latitude: 36.15209854761212, longitude: -95.94589348223457}, {latitude: 36.152151067270076, longitude: -95.94589214113017}, {latitude: 36.152152691588846, longitude: -95.94598400678129}, 
              {latitude: 36.15220358689287, longitude: -95.94598199512471}, {latitude: 36.152204669771336, longitude: -95.94607453132804}, {latitude: 36.152054181659054, longitude: -95.94607509174578}, {latitude: 36.15205201589798, longitude: -95.94610258438591}, 
              {latitude: 36.15203577268805, longitude: -95.94610258438591}, {latitude: 36.152035231247645, longitude: -95.94611800708645}, {latitude: 36.15203577268805, longitude: -95.94611800708645}, {latitude: 36.15202548532001, longitude: -95.94612739481722}, 
              {latitude: 36.15202602676046, longitude: -95.94615153469637}, {latitude: 36.15203577268805, longitude: -95.94615824021835}, {latitude: 36.152035231247645, longitude: -95.94617701567988}, {latitude: 36.15205309877853, longitude: -95.94617701567988}, 
              {latitude: 36.15205309877853, longitude: -95.9462058494244}, {latitude: 36.152209033420625, longitude: -95.9462038377678}, {latitude: 36.15220957485984, longitude: -95.94626821077883}, {latitude: 36.15230649241452, longitude: -95.94626821077883}, 
              {latitude: 36.15230649241452, longitude: -95.94621456660296}, {latitude: 36.15232111125314, longitude: -95.94621523715519}, {latitude: 36.152321652691555, longitude: -95.94620115555901}, {latitude: 36.15246567518053, longitude: -95.94620115555799}, 
              {latitude: 36.15246675805536, longitude: -95.94617299236567}, {latitude: 36.152481918301405, longitude: -95.94617433347007}, {latitude: 36.15248245973873, longitude: -95.9461568991129}, {latitude: 36.15249112273511, longitude: -95.94615086414314}, 
              {latitude: 36.15249112273511, longitude: -95.94612471260741}, {latitude: 36.152481918301405, longitude: -95.94611800708542}, {latitude: 36.15248300117603, longitude: -95.94609923162389}, {latitude: 36.15246513374311, longitude: -95.9460985610717}, 
              {latitude: 36.15246459230568, longitude: -95.94607173898376}, {latitude: 36.152452680681385, longitude: -95.94607173898376}, {latitude: 36.152454304993896, longitude: -95.94603821137386}, {latitude: 36.15253443770263, longitude: -95.94603687026948}, 
              {latitude: 36.15253389626568, longitude: -95.94601340094253}
            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
            />

            {/* Lottie Jane Mabee Hall */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={DORM_COLOR}
            coordinates={[
              {latitude: 36.151556952252335, longitude: -95.94868758558678}, {latitude: 36.151556410808645, longitude: -95.94859102607025}, {latitude: 36.15155099637149, longitude: -95.94859169662244}, 
              {latitude: 36.15154991348401, longitude: -95.94839924814161}, {latitude: 36.150998180365, longitude: -95.94839589538027}, {latitude: 36.150997638917445, longitude: -95.94854475796824}, 
              {latitude: 36.15143133721366, longitude: -95.94854609907595}, {latitude: 36.15143133721366, longitude: -95.94885924695242}, {latitude: 36.151108635588685, longitude: -95.9488565647423}, 
              {latitude: 36.15110755269508, longitude: -95.94872983037688}, {latitude: 36.151013340896, longitude: -95.94872848927247}, {latitude: 36.151012258001096, longitude: -95.94886930523407}, 
              {latitude: 36.151000887603736, longitude: -95.94886930523407}, {latitude: 36.1510003461562, longitude: -95.94898262855553}, {latitude: 36.1510312086597, longitude: -95.94898329910771}, 
              {latitude: 36.1510312086597, longitude: -95.94901883837422}, {latitude: 36.15110971848224, longitude: -95.94901950892641}, {latitude: 36.15110971848224, longitude: -95.94900274512146}, 
              {latitude: 36.151469238324125, longitude: -95.94900542733193}, {latitude: 36.15146869687983, longitude: -95.94903761383743}, {latitude: 36.151538001719956, longitude: -95.94903761383743}, 
              {latitude: 36.151538001719956, longitude: -95.94899201628796}, {latitude: 36.15154720626442, longitude: -95.94899134573575}, {latitude: 36.15154828915191, longitude: -95.94868758559006}
            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
            />

            {/* Hardesty Hall */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={DORM_COLOR}
            coordinates={[
              {latitude: 36.153655046182635, longitude: -95.94479439947533}, {latitude: 36.153655046182635, longitude: -95.9442177245923}, 
              {latitude: 36.15339082828421, longitude: -95.94422308900982}, {latitude: 36.153386496835815, longitude: -95.94441352583165}, 
              {latitude: 36.153493832710474, longitude: -95.94441233453934}, {latitude: 36.153492628885665, longitude: -95.94455248068232}, 
              {latitude: 36.15310018101423, longitude: -95.94455546251514}, {latitude: 36.15309980541543, longitude: -95.94439414747659}, 
              {latitude: 36.15308770162368, longitude: -95.94439664585369}, {latitude: 36.15308568432489, longitude: -95.94431045184417}, 
              {latitude: 36.153100814064636, longitude: -95.94429296320455}, {latitude: 36.153100814064636, longitude: -95.94425423835969}, 
              {latitude: 36.153083667026024, longitude: -95.94425423835969}, {latitude: 36.153083667026024, longitude: -95.94411557843134}, 
              {latitude: 36.152842599439, longitude: -95.9441168276199}, {latitude: 36.15284461674407, longitude: -95.94464273599678}, 
              {latitude: 36.15293136081248, longitude: -95.94464273599678}, {latitude: 36.152932369463876, longitude: -95.94480263213039}
            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
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