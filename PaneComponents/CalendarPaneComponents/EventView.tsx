import React, { useState, useEffect, FC} from 'react';
import {StyleSheet, Image, Text, View, Pressable, Animated} from 'react-native'
import { Event, Event_Data } from '../../Database/Event';
import { EventViewHeader } from './EventViewHeader';

type EventViewProps = {
    Name: string,
    Height: number,
    Day: string
}

export const EventView: FC<EventViewProps> = ({Name, Height, Day}) => {

    const [EventData, setEventData] = useState<Event_Data>();
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        Event.queryAttributes_Name(Name).then((value:Event_Data) => {
            setEventData(value);
        });
    }, [Name]);

    if (EventData == undefined) {
        return (<View></View>);
    }
    else {
        return (
            <View style = {styles.eventViewContainer}>
                <EventViewHeader 
                       Name = {EventData.Name} 
                       isExpanded = {expanded} 
                       setIsExpanded = {setExpanded}></EventViewHeader>

                <View>
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
                </View>
                
            </View>
        );
    }    
}

const styles = StyleSheet.create({
    eventViewContainer: {
        backgroundColor: 'white',
        justifyContents: 'columns',
        height: '100%',
        width: '100%'
    }
});