import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, TouchableOpacity, Switch, TextInput } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { getTokenSourceMapRange, isPropertySignature, setTextRange } from 'typescript';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './tsx-files/LoginScreen';
import MainPage from './tsx-files/LoginScreen';

// import logo from './assets/icon.png';

//npm install @react-navigation/stack
//npm install @react-navigagtion/native (i dunno if you actually have to do this)
//npm in install react-native

const { Navigator, Screen } = createStackNavigator()

export default function App() {
  
  return (
    <NavigationContainer>
        <Navigator initialRouteName = "login">
            <Screen name = "login" component = {LoginPage}></Screen>
            <Screen name = "main" component = {MainPage}></Screen>
        </Navigator>
    </NavigationContainer>
  );
}