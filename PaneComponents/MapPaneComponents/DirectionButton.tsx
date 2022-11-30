import React, { useState, useEffect, FC } from 'react';
import {StyleSheet, TouchableOpacity, Image, Modal, Text, View, TextInput} from 'react-native'

import { RoutingPopup } from './RoutingPopup';

//The 'selectingRoute' state from 'MapPane' will toggle the visibility of the 'DirectionButton'
type DirectionButtonProps = {
  selectingRoute: boolean,
  setSelectingRoute: React.Dispatch<React.SetStateAction<boolean>>
};


export const DirectionButton: FC<DirectionButtonProps> = ({selectingRoute, setSelectingRoute}) => {
    return(
        <TouchableOpacity disabled = {selectingRoute} onPress = {() => {setSelectingRoute(true)}}
        activeOpacity = {1} style = {styles.button}>
          
          { !selectingRoute && <Image style={styles.icon} source={require('../../assets/Directions.png')}></Image> }
        </TouchableOpacity>
    );
} 

const styles = StyleSheet.create({
    button: {
      position: 'absolute',
      top: 15,
      left: 10,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      transform: [{ rotate: "45deg" }],
      //backgroundColor: 'white'
    },
  
    icon:{
      position: 'absolute',
      top: 8,
      left: 3,
      width: 54,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      //transform: [{ rotate: "45deg" }],
      // borderRadius: 100,
      //backgroundColor: 'white'
    }
  });