import React, { useState, useEffect, FC, useRef } from 'react';
import {StyleSheet, Image, Modal, Text, View, TextInput, Button, Pressable, ScrollView} from 'react-native'
import { Event, Event_Data } from '../../Database/Event';
import { Location, Location_Data } from '../../Database/Location';
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePickerModal from "react-native-modal-datetime-picker";


interface select_list_interface {
    key: number,
    value: string
}

export const EventForm = () => {
    //State variable to toggle the visibility of the form
    const [formVisible, setFormVisible] = useState<boolean>(false)
    const locations = useRef<select_list_interface[]>([])

    const selectedName = useRef<string>("")
    const selectedDescription = useRef<string>("")
    const selectedCategory = useRef<string>("")
    const selectedLocation = useRef<string>("")

    const [startDatePickVisible, setStartDatePickVisible] = useState<boolean>(false)
    const [endDatePickVisible, setEndDatePickVisible] = useState<boolean>(false)

    const [selectedStartTime, setStartTime] = useState<Date>(new Date())
    const [selectedEndTime, setEndTime] = useState<Date>(new Date())


    //This useEffect will load in all possible locations in the database for selection
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
                                console.log(new_event)
                                setFormVisible(!formVisible)
                            }} 
                            title={'Submit'}></Button>
                        </View>
                    </View>
                    
                    <View style={styles.textInputContainer}>
                        <TextInput style={styles.textInput} autoCorrect={false} 
                        placeholder={'Enter Name'} placeholderTextColor={'black'}
                        onSubmitEditing={
                            (e) => {
                                selectedName.current = e.nativeEvent.text.toLowerCase();
                            }}></TextInput>
                    </View>

                    <View style={styles.textInputContainer}>
                        <TextInput style={styles.textInput} autoCorrect={false} 
                        placeholder={'Enter Description'} placeholderTextColor={'black'}
                        onSubmitEditing={
                            (e) => {
                                selectedDescription.current = e.nativeEvent.text.toLowerCase();
                            }}></TextInput>
                    </View>

                    <View style={styles.textInputContainer}>
                        <TextInput style={styles.textInput} autoCorrect={false} 
                        placeholder={'Enter Category'} placeholderTextColor={'black'}
                        onSubmitEditing={
                            (e) => {
                                selectedCategory.current = e.nativeEvent.text.toLowerCase();
                            }}></TextInput>
                    </View>

                    <View style={styles.textInputContainer}>
                        <Text style={styles.dateInput} onPress={ () => {
                            setStartDatePickVisible(!startDatePickVisible)
                         }}>{selectedStartTime.toUTCString()}</Text>
                        
                        <DateTimePickerModal isVisible={startDatePickVisible}
                                             mode={'datetime'}
                                             onConfirm= {(newDate: Date)=>{
                                                setStartTime(newDate) 
                                                setStartDatePickVisible(!startDatePickVisible)
                                            }}
                                            onCancel={()=>{setStartDatePickVisible(!startDatePickVisible)}}
                                            ></DateTimePickerModal>
                    </View>

                    <View style={styles.textInputContainer}>

                        <Text style={styles.dateInput} onPress={ () => {
                            setEndDatePickVisible(!endDatePickVisible)
                         }}>{selectedEndTime.toUTCString()}</Text>
                        
                        <DateTimePickerModal isVisible={endDatePickVisible}
                                             mode={'datetime'}
                                             onConfirm= {(newDate: Date)=>{
                                                setEndTime(newDate) 
                                                setEndDatePickVisible(!endDatePickVisible)
                                            }}
                                            onCancel={()=>{setEndDatePickVisible(!endDatePickVisible)}}
                                            ></DateTimePickerModal>
                    </View>

                    <SelectList data={locations.current} save={'value'} setSelected={(location: string) => {
                        console.log(location)
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
    },

    textInputContainer: {
        width: '100%',
        height: '5.5%',
        marginBottom: '5%'
    },

    textInput: {
        height: '100%', 
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1,    
        paddingLeft: '5%'
    },
    dateInput: {
        height: '100%', 
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1,    
        paddingLeft: '5%',
        paddingTop: '3%'
    }
});