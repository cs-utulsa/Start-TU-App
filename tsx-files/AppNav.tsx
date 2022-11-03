import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './LoginScreen';
import App from '../App';


//npm install @react-navigation/stack
//npm install @react-navigagtion/native (i dunno if you actually have to do this)
//npm in install react-native

const { Navigator, Screen } = createStackNavigator()

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator initialRouteName = "login">
            <Screen name = "login" component = {LoginPage}></Screen>
            <Screen name = "main" component = {App}></Screen>
        </Navigator>
    </NavigationContainer>
)

export default AppNavigator;
