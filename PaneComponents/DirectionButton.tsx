import React, { useState, useEffect } from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native'

export const DirectionButton = () => {
    return(
        <TouchableOpacity activeOpacity = {1} style = {styles.button}>
            <Image style={styles.icon} source={require('../assets/Directions.png')}></Image>
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
      backgroundColor: 'white'
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