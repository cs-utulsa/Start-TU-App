import React, { useState, useEffect, FC, useRef } from 'react';
import {StyleSheet, Image, Modal, Text, View, TextInput, Button, Pressable, ScrollView} from 'react-native'
import { Event, Event_Data } from '../../Database/Event';
import { Location, Location_Data } from '../../Database/Location';
import { SelectList } from 'react-native-dropdown-select-list'

import { FormTextInput } from './FormComponents/FormTextInput';
import { FormDateInput } from './FormComponents/FormDateInput';

interface select_list_interface {
    key: number,
    value: string
}

export const EventForm = () => {
    //State variable to toggle the visibility of the form
    const [formVisible, setFormVisible] = useState<boolean>(false)

    //Reference variable for formatting the location names for the select list
    const locations = useRef<select_list_interface[]>([])

    //Reference variables for keeping tracking of the name, description, category, and location
    const selectedName = useRef<string>("")
    const selectedDescription = useRef<string>("")
    const selectedCategory = useRef<string>("")
    const selectedLocation = useRef<string>("")

    //These two states toggle the visibility of the datetime modals
    const [startDateModalVisible, setStartDateModalVisible] = useState<boolean>(false)
    const [endDateModalVisible, setEndDateModalVisible] = useState<boolean>(false)

    //These two states keep track of the start and end time.
    const [selectedStartTime, setStartTime] = useState<Date>(new Date())
    const [selectedEndTime, setEndTime] = useState<Date>(new Date())


    //This useEffect will load in all possible locations in the database for the selection list
    useEffect(() => {
        Location.queryAttributes_Tag().then((all_locations: Location_Data[]) => {
            for (let i = 0; i < all_locations.length; i++) {
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
              visible={formVisible}>
                <View style={styles.formContainer}>
                    <View style={styles.buttonRow}>

                        <View style={styles.button}>
                            <Button onPress={() => {
                                setFormVisible(!formVisible)
                            }} 
                            title={'Close'}></Button>
                        </View>

                        <View style={styles.button}>
                            <Button onPress={() => {
                                const new_event: Event_Data = {
                                    Name: selectedName.current,
                                    Description: selectedDescription.current,
                                    Date_Start: selectedStartTime,
                                    Date_End: selectedEndTime,
                                    Category: selectedCategory.current,
                                    Location: selectedLocation.current
                                }
                                
                                Event.insertIntoEventTable(new_event)
                                setFormVisible(!formVisible)
                            }} 
                            title={'Submit'}></Button>
                        </View>
                    </View>
                    
                    <FormTextInput placeholder={'Enter Name'} selectedRef={selectedName}></FormTextInput>
                    <FormTextInput placeholder={'Enter Description'} selectedRef={selectedDescription}></FormTextInput>
                    <FormTextInput placeholder={'Enter Category'} selectedRef={selectedCategory}></FormTextInput>

                    <FormDateInput modalVisible={startDateModalVisible}
                                   setModalVisible={setStartDateModalVisible}
                                   date={selectedStartTime}
                                   setDate={setStartTime}></FormDateInput>

                    <FormDateInput modalVisible={endDateModalVisible}
                                   setModalVisible={setEndDateModalVisible}
                                   date={selectedEndTime}
                                   setDate={setEndTime}></FormDateInput>

                    <SelectList data={locations.current} save={'value'} setSelected={(location: string) => {
                        selectedLocation.current = location
                    }} placeholder = {'Select Location'}></SelectList>
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
        backgroundColor: 'white',
        flexDirection: 'column'
    },

    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        height: '5%',
    },

    button: {
        marginRight: '60%',
        width: '20%',
        height: '100%',
    }
});