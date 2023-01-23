import React, {useEffect} from 'react';

//Dependencies that interface with SQLite database
import { populate } from './Database/Populate_DB';

import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './Screens/LoginScreen';
import MainPage from './Screens/MainScreen';


const { Navigator, Screen } = createStackNavigator()

export default function App() {
  useEffect(() => {
    populate();
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