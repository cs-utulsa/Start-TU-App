import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, TouchableOpacity, Switch, TextInput } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { getTokenSourceMapRange, isPropertySignature, setTextRange } from 'typescript';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export const DARK_BLACK = '#171D28'
export const LIGHT_BLUE = '#C0E2F6'
export const DARK_BLUE = '#315796'
export const PANK = '#C490EB'
export const TU_GOLD = '#C2A01E'
export const TU_BLUE = '#102240'
export const TU_LIGHT_BLUE = '#004B8D'


export const styles = StyleSheet.create({
    loginPage: {
      padding: 10,
      flex: 1,
      backgroundColor: LIGHT_BLUE
    },
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
      backgroundColor: DARK_BLUE,
    },
    calenderPane: {
      flex: 9,
      backgroundColor: 'white',
    },
    emailPane: {
      flex: 9,
      backgroundColor: DARK_BLUE,
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
    loginButton: {
      flex: 1,
      backgroundColor: PANK,
      borderColor: DARK_BLACK,
      alignItems: "center",
      padding: 5
    },
    icon: {
      height: 50,
      width: 50,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: DARK_BLUE,
      backgroundColor: TU_GOLD,
      alignItems: 'center',
      padding: 5
    },
});

export default styles