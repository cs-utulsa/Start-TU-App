import React, { useState, useEffect, FC } from 'react';
import {StyleSheet, Image, Modal, Text, View, TextInput, Button, Pressable} from 'react-native'
import { Event, Event_Data } from '../../Database/Event';

export const EventForm = () => {
    const [formVisible, setFormVisible] = useState<boolean>(false)

    return(
        <Pressable disabled = {false} style = {styles.buttonPopupPressable} onPress={() => {
            setFormVisible(!formVisible)
        }}>
            <Image source={require('../../assets/EventExpandIcon.png')} style={styles.eventAddIcon}></Image>
            <Modal
              animationType="slide"
              transparent={true}
              visible={formVisible}
              onDismiss ={() => {

              }}
              style={{justifyContent: 'center',
              alignItems: 'center',
              margin: 0}}>

                <View style={styles.formContainer}>
                    <View style={styles.buttonRow}>
                        <View style={styles.button}>
                            <Button onPress={() => {
                                console.log('test')
                                setFormVisible(!formVisible)
                            }} 
                            title={'close'}></Button>
                        </View>

                        <View style={styles.button}>
                            <Button onPress={() => {
                                console.log('test')
                                setFormVisible(!formVisible)
                            }} 
                            title={'submit'}></Button>
                        </View>
                    </View>
                </View>

              </Modal>
        </Pressable>    
    )
}


const styles = StyleSheet.create({
    buttonPopupPressable: {
      position: 'relative',
      height: 50, 
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      //backgroundColor: 'red'
    },
    eventAddIcon: {
        position: 'relative',
        height: '110%',
        width: '110%'
    },

    formContainer: {
        width: '100%',
        height: '100%',
        paddingTop: '15%',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        flexDirection: 'column'
    },

    buttonRow: {
        flexDirection: 'row',
        //backgroundColor: 'grey',
        width: '100%',
        height: '5%',
    },

    button: {
        marginRight: '60%',
        width: '20%',
        height: '100%',
    },
});