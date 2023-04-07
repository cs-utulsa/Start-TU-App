import React, { useState, useEffect } from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';

import CalendarPane from '../Panes/CalendarPane';
import ClassesPane from '../Panes/ClassesPane';
import EmailPane from '../Panes/EmailPane';
import MapPane from '../Panes/MapPane';
import UserPane from '../Panes/UserPane';
import GuestPane from '../Panes/GuestPane';

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

const MainPage = (screenInterface: MainScreenInterface, route: any) => {

    route = useRoute();

    const[paneState, setPaneState] = useState(MAP_STATE);

    //State for telling if the user is logged on as a guest or as a student
    const[loginState, setLoginState] = useState<number>(0);

    //If the user is logged on as a student, keep track of the access token 
    const[access_token, setAccess_Token] = useState<string>('')
    
    //Upon initially rendering this page, set the login state and access token
    useEffect(() => {
      setLoginState(route.params.paramKey[0])
      setAccess_Token(route.params.paramKey[1])
    }, [])
    
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
              {loginState == 0 && paneState == USER_STATE && <UserPane access_token={access_token}></UserPane>}
              {loginState == 1 && paneState == USER_STATE && <GuestPane></GuestPane>}
              {loginState == 0 && paneState == CLASSES_STATE && <ClassesPane></ClassesPane>}
              {loginState == 1 && paneState == CLASSES_STATE && <GuestPane></GuestPane>}
              {paneState == MAP_STATE && <MapPane></MapPane>}
              {paneState == CALENDER_STATE && <CalendarPane></CalendarPane>}
              {loginState == 0 && paneState == EMAIL_STATE && <EmailPane></EmailPane>}
              {loginState == 1 && paneState == EMAIL_STATE && <GuestPane></GuestPane>}
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