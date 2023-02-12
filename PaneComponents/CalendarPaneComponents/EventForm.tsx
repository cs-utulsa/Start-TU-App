import React, { useState, useEffect, FC } from 'react';
import {StyleSheet, Image, Modal, Text, View, TextInput, Button, Pressable, ImageBackground} from 'react-native'
import { Event, Event_Data } from '../../Database/Event';

export const EventForm = (props:any) => {
    return(
        <View>
            <Pressable disabled = {false} style = {styles.button}></Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    button: {
      position: 'relative',
      height: '100%', 
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      backgroundColor: 'grey'
    }
});