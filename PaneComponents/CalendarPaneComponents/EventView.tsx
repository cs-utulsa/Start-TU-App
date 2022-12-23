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
    return (
    <View>
        <Text>
            {Name}
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