import React, { useState, useEffect, FC } from 'react';
import {StyleSheet, Image, Modal, Text, View, TextInput, Button, Pressable, ImageBackground} from 'react-native'
import { Event, Event_Data } from '../../Database/Event';

export const EventForm = () => {
    return(
        <Pressable disabled = {false} style = {styles.buttonPressable} onPress={() => {
            console.log('pressed')
        }}>
            <Image source={require('../../assets/EventExpandIcon.png')} style={styles.buttonIcon}></Image>
        </Pressable>    
    )
}


const styles = StyleSheet.create({
    buttonPressable: {
      position: 'relative',
      height: 50, 
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      //backgroundColor: 'red'
    },
    buttonIcon: {
        position: 'relative',
        height: '110%',
        width: '110%'
    }
});