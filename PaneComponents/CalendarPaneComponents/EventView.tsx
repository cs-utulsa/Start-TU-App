import React, { useState, useEffect, FC, useLayoutEffect, useMemo } from 'react';
import {StyleSheet, Image, Modal, Text, View, TextInput, Button, Pressable, ImageBackground, Animated} from 'react-native'
import { Event, Event_Data } from '../../Database/Event';

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
            <View>
                <Text>
                    {EventData.Name}
                </Text>
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
        );
    }    
}

const styles = StyleSheet.create({
    onPressRoute: {
      alignSelf: 'flex-start',
      top: -10,
      left: 100,
      //backgroundColor: 'black'
    },

    eventViewContainer: {
        alignSelf: 'center',
        backgroundColor: 'white'
    }
});