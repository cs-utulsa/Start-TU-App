import React, { useState, useEffect, FC } from 'react';
import {StyleSheet, TouchableOpacity, Image, Modal, Text, View, TextInput} from 'react-native'
import { RoutingPopup } from './RoutingPopup';
type DirectionButtonProps = {
  buttonVisible: boolean,
  setButtonVisible: React.Dispatch<React.SetStateAction<boolean>>
};


export const DirectionButton: FC<DirectionButtonProps> = ({buttonVisible, setButtonVisible}) => {
    
    return(
        <TouchableOpacity disabled = {!buttonVisible} onPress = {() => {setButtonVisible(!buttonVisible)}}
        activeOpacity = {1} style = {styles.button}>
          
          { buttonVisible && <Image style={styles.icon} source={require('../assets/Directions.png')}></Image> }
        </TouchableOpacity>
    );
} 

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
    modal:{
      margin: 20,
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: 20,
      padding: 50,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
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