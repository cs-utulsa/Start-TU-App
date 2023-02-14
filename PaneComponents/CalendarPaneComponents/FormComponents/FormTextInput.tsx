import React, { useState, useEffect, FC, useRef } from 'react';
import {StyleSheet, Image, Modal, Text, View, TextInput, Button, Pressable, ScrollView} from 'react-native'


type FormTextInputProps = {
    placeholder: string,
    selectedRef: React.MutableRefObject<string>
}


export const FormTextInput:FC<FormTextInputProps> = ({placeholder, selectedRef}) => {

    return(
        <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput} autoCorrect={false} 
                placeholder={placeholder} placeholderTextColor={'black'}
                onSubmitEditing={(e) => {
                    selectedRef.current = e.nativeEvent.text.toLowerCase();
                }}></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
});