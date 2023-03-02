import React, { useState, useEffect, FC } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Email_Data } from '../../Database/Email';
import { Modal, Pressable, Button } from 'react-native';


type ExpandedProps = {
    item: Email_Data
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const Expanded: FC<ExpandedProps> = ({item, visible, setVisible}) => {
    return(
        <View style = {styles.container}>
            
            <View style = {styles.buttonContainer}>
                <Button title={'Close'} onPress={() => {
                    setVisible(!visible)
                }}></Button>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        width: '100%', 
        height: '100%',
        paddingTop: '12.5%',
        backgroundColor: 'white',
        flexDirection: 'column'
    },

    buttonContainer: {
        // backgroundColor: 'red',
        width: '16%',
        height: '5%',
        left: 5
    }
});