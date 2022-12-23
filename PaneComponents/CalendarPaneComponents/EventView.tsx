import React, { useState, useEffect, FC } from 'react';
import {StyleSheet, Image, Modal, Text, View, TextInput, Button, Pressable, ImageBackground} from 'react-native'
import { Event, Event_Data } from '../../Database/Event';

type EventViewProps = {
    Name: string,
    Height: number,
    Day: string
}

export const EventView: FC<EventViewProps> = ({Name, Height, Day}) => {

    const [EventData, setEventData] = useState<Event_Data>({} as Event_Data);

    useEffect(() => {
        Event.queryAttributes_Name(Name).then((value:Event_Data) => {
            setEventData(value);
        });
    }, [Name]);

    return (
    <View>
        <Text>
            {EventData.Name}
        </Text>
        <Text>
            {EventData.Description}
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

const styles = StyleSheet.create({
    onPressRoute: {
      alignSelf: 'flex-start',
      top: -10,
      left: 100,
      //backgroundColor: 'black'
    }
});