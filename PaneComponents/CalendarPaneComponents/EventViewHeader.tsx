import React, { useState, useEffect, FC} from 'react';
import {StyleSheet, Image, Text, View, Pressable, Animated} from 'react-native'
import { Event, Event_Data } from '../../Database/Event';

type EventViewHeaderProps = {
    Name: string,
    isExpanded: boolean,
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

export const EventViewHeader: FC<EventViewHeaderProps> = ({Name, isExpanded, setIsExpanded}) => {

    return(
        <View style = {styles.eventViewHeader}>
            <Pressable style = {styles.eventViewHeaderPressable} onPress = {
                () => {
                    setIsExpanded(!isExpanded);
                }
            }>
                <Image style = {styles.eventViewHeaderIcon} 
                       source={require('../../assets/EventExpandIcon.png')}></Image>
            </Pressable>
                    

            <Text style = {styles.eventViewHeaderText}>
                {Name}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    eventViewHeader: {
        alignSelf: 'flex-start',
        width: '100%',
        height: '30%',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },

    eventViewHeaderPressable: {
        alignSelf: 'center',
        width: '7.5%',
        height: '80%',
        justifyContents: 'center',
        //backgroundColor: 'white'
    },

    eventViewHeaderIcon: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        //backgroundColor: 'black'
    },

    eventViewHeaderText: {
        color: 'black',
        fontSize: 20,
        alignSelf: 'center',
        left: 10,
        //backgroundColor: 'white',
    }
});