import React, {useEffect, useState} from 'react';

//Dependencies that interface with SQLite database
import { populate } from './Database/Populate_DB';
import { runLocationTests } from './unit_tests/Location_DB_tests';

import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './Screens/LoginScreen';
import MainPage from './Screens/MainScreen';

import * as Location from 'expo-location'
import { JsxEmit } from 'typescript';
import { View } from 'react-native';

const { Navigator, Screen } = createStackNavigator()

export default function App() {

  const [location, setLocation] = useState({})

  useEffect(() => {
    populate();
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == 'granted') {
        console.log('Permission to access location was successful');
      }else{
        console.log('Permission to access location was not successful')

      }

      const loc = await Location.getCurrentPositionAsync() 
      console.log(loc)

      setLocation(loc)


    })();
    //downloadDatabase_Expo_To_Machine();
  }, []);
  

  return (
    <NavigationContainer>
        <Navigator initialRouteName = "login">
            <Screen name = "login" component = {LoginPage}></Screen>
            <Screen name = "main" component = {MainPage} options={{headerShown: false}}></Screen>
        </Navigator>
    </NavigationContainer>
  );
}
