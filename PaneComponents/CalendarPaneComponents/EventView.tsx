import React, { useState, useEffect, FC} from 'react';
import {StyleSheet, Image, Text, View, Pressable, Animated, ScrollView} from 'react-native'
import { Event, Event_Data } from '../../Database/Event';
import { EventViewHeader } from './EventViewHeader';
import { EventViewBody } from './EventViewBody';

type EventViewProps = {
    Name: string,
    Height: number,
    Day: string
}

export const EventView: FC<EventViewProps> = ({Name, Height, Day}) => {

    const [EventData, setEventData] = useState<Event_Data>({Date_Start: new Date(''), Date_End: new Date('')} as Event_Data);
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        Event.queryAttributes_Name(Name).then((value:Event_Data) => {
            setEventData(value);
        });
    }, [Name]);

    return (
        <View style = {styles.eventViewContainer}>
            <EventViewHeader 
                   Name = {EventData.Name} 
                   isExpanded = {expanded} 
                   setIsExpanded = {setExpanded}></EventViewHeader>

            <EventViewBody isExpanded={expanded} EventData={EventData}></EventViewBody>
        </View>
    ); 
}

const styles = StyleSheet.create({
    eventViewContainer: {
        //backgroundColor: 'white',
        flexDirection: 'column',
        height: '15%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    }
});