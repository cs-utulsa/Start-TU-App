import React, { useState } from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {StatusBar} from 'expo-status-bar';

import CalendarPane from '../Panes/CalendarPane';
import ClassesPane from '../Panes/ClassesPane';
import EmailPane from '../Panes/EmailPane';
import MapPane from '../Panes/MapPane';
import UserPane from '../Panes/UserPane';

import {styles, TU_BLUE} from '../Panes/PaneStyles';


const USER_STATE = 0
const CLASSES_STATE = 1
const MAP_STATE = 2
const CALENDER_STATE = 3
const EMAIL_STATE = 4
const LOGIN_STATE = 5
const USER_PASSWORD = "password"


interface MainScreenInterface {
    navigation: any;
}

const MainPage = (screenInterface: MainScreenInterface) => {

    const[paneState, setPaneState] = useState(MAP_STATE);
    
    return (
        <View style={{flex: 1, backgroundColor: TU_BLUE}}>
          <View style={{paddingTop:20, padding: 5}}></View>
          <View style={{flex: 1}}>
            <StatusBar style="light"/>
            <View style={{paddingTop:20, padding: 5}}>
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/TUlogonormal.png')}
              />
            </View>
            <View style={{flex: 1}}>
              <StatusBar style="light"/>
              {paneState == USER_STATE && <UserPane></UserPane>}
              {paneState == CLASSES_STATE && <ClassesPane></ClassesPane>}
              {paneState == MAP_STATE && <MapPane></MapPane>}
              {paneState == CALENDER_STATE && <CalendarPane></CalendarPane>}
              {paneState == EMAIL_STATE && <EmailPane></EmailPane>}
              <BottomButtons state={paneState} changeState={setPaneState}></BottomButtons>
            </View>
          </View>
        </View>
      );
}


const BottomButtons = ({state, changeState}: any) => (
    <View style={styles.bottomButtonRow}>
      <TouchableOpacity onPress={() => changeState(0)} activeOpacity = {1} style={styles.bottomButton}>
        {state == USER_STATE && <Image style={styles.icon} source={require('../assets/TUuserinv.png')} />}
        {state != USER_STATE && <Image style={styles.icon} source={require('../assets/TUuser.png')} />}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeState(1)} activeOpacity = {1} style={styles.bottomButton}>
        {state == CLASSES_STATE && <Image style={styles.icon} source={require('../assets/TUclassesinv.png')} />}
        {state != CLASSES_STATE && <Image style={styles.icon} source={require('../assets/TUclasses.png')} />}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeState(2)} activeOpacity = {1} style={styles.bottomButton}>
        {state == MAP_STATE && <Image style={styles.icon} source={require('../assets/TUmapinv.png')} />}
        {state != MAP_STATE && <Image style={styles.icon} source={require('../assets/TUmap.png')} />}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeState(3)} activeOpacity = {1} style={styles.bottomButton}>
        {state == CALENDER_STATE && <Image style={styles.icon} source={require('../assets/TUcalenderinv.png')} />}
        {state != CALENDER_STATE && <Image style={styles.icon} source={require('../assets/TUcalender.png')} />}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeState(4)} activeOpacity = {1} style={styles.bottomButton}>
        {state == EMAIL_STATE && <Image style={styles.icon} source={require('../assets/TUemailinv.png')} />}
        {state != EMAIL_STATE && <Image style={styles.icon} source={require('../assets/TUemail.png')} />}
      </TouchableOpacity>
        
    </View>
  );

export default MainPage;