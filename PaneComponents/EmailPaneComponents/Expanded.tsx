import React, { useState, useEffect, FC } from 'react';
import { Text, View, StyleSheet, ScrollView} from 'react-native';
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
            
            <View style = {styles.subjectContainer}>
                <Text style={{fontSize: 40}}>{item.Subject}</Text>
            </View>

            <ScrollView style = {styles.bodyContainer}>
                <Text style={{fontSize: 20}}>{item.Sender_Email}</Text>
                {<Text style={styles.bodyContainerHeader}>{item.receivedDateTime.toString()}</Text>}
                <Text style={{fontSize: 20}}>{item.Body}</Text>
            </ScrollView>
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
        //backgroundColor: 'red',
        width: '16%',
        height: '5%',
        left: 5,
    },

    subjectContainer: {
        width: '100%',
        height: '10%',
        backgroundColor: '#F1F0F0',
        borderBottomWidth: 1,
        borderBottomColor: '#C9C8C8'
    },

    bodyContainer: {
        width: '100%',
        height: '85%',
        backgroundColor: '#F1F0F0'
    },

    bodyContainerHeader: {
        paddingBottom: 30,
        fontSize: 20
    }
});