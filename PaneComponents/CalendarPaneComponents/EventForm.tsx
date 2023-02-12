import React, { useState, useEffect, FC, useRef } from 'react';
import {StyleSheet, Image, Modal, Text, View, TextInput, Button, Pressable} from 'react-native'
import { Event, Event_Data } from '../../Database/Event';
import { Location, Location_Data } from '../../Database/Location';
import { SelectList } from 'react-native-dropdown-select-list'


interface select_list_interface {
    key: number,
    value: string
}

export const EventForm = () => {
    //State variable to toggle the visibility of the form
    const [formVisible, setFormVisible] = useState<boolean>(false)
    
    const locations = useRef<select_list_interface[]>([])

    const selectedLocation = useRef<string>("")

    useEffect(() => {
        Location.queryAttributes_Tag().then((all_locations: Location_Data[]) => {
            for (let i = 0; i < all_locations.length; i++) {
                const test = {key: i, value: all_locations[i].Name}
                locations.current.push({key: i, value: all_locations[i].Name})
            }
        })
    }, [])
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

              }}>
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

                    <SelectList data={locations.current} save={'value'} setSelected={(location: string) => {
                        selectedLocation.current = location
                        console.log(selectedLocation.current)
                    }}></SelectList>
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