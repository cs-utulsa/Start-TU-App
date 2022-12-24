import React, { useState, useEffect, FC, useRef} from 'react';
import {StyleSheet, Image, Text, View, Pressable, Animated, ScrollView} from 'react-native'
import { Event, Event_Data } from '../../Database/Event';

type EventViewBodyProps = {
    isExpanded: boolean,
    EventData: Event_Data
}

export const EventViewBody:FC<EventViewBodyProps> = ({isExpanded, EventData}) => {
    const [bodyHeight] = useState<Animated.Value>(new Animated.Value(0));
    
    useEffect(() => {
        Animated.timing(bodyHeight, {
            toValue: !isExpanded ? 75 : 0,
            duration: 150,
            useNativeDriver: false
        }).start();
    },[isExpanded, bodyHeight]);

    return(
        <Animated.ScrollView style = {{
            //backgroundColor: 'powderblue',
            paddingBottom: bodyHeight
        }}>
            <Text>
                {EventData.Description}
            </Text>
            <Text>
                {EventData.Date_Start.toString()}
            </Text>
            <Text>
                {EventData.Date_End.toString()}
            </Text>
            <Text>
                {EventData.Category}
            </Text>
            <Text>
                {EventData.Location}
            </Text>
        </Animated.ScrollView>
    );
}

