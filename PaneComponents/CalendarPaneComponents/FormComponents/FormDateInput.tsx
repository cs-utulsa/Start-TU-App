import React, { useState, useEffect, FC, useRef } from 'react';
import {StyleSheet, Image, Modal, Text, View, TextInput, Button, Pressable, ScrollView} from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";

type FormDateInputProps = {
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    date: Date
    setDate: React.Dispatch<React.SetStateAction<Date>>
}

export const FormDateInput: FC<FormDateInputProps> = ({modalVisible, setModalVisible, date, setDate}) => {
    return(
        <View style={styles.textInputContainer}>
            <Text style={styles.dateInput} onPress={ () => {
                setModalVisible(!modalVisible)
            }}>{date.toUTCString()}</Text>
                        
            <DateTimePickerModal isVisible={modalVisible}
                                 mode={'datetime'}
                                 onConfirm= {(newDate: Date)=>{
                                 newDate.setDate(newDate.getDate())
                                    setDate(newDate) 
                                    setModalVisible(!modalVisible)
                                 }}
                                 onCancel={()=>{setModalVisible(!modalVisible)}}
                                 minimumDate={new Date()}
                                ></DateTimePickerModal>
        </View>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        width: '100%',
        height: '5.5%',
        marginBottom: '5%'
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