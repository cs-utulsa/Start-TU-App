import React, { useState, useEffect, FC } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, SectionList, SectionListData, SectionListRenderItem } from 'react-native';
import {StatusBar} from 'expo-status-bar';

import { Email, Email_Data } from '../../Database/Email'; 


type HeaderProps = {
    monthYear: Date
}

export const Header: FC<HeaderProps> = ({monthYear}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{(monthYear.getMonth()+1)%12 + 1}</Text>
            <Text style={styles.text}>/</Text>

            {
                ((monthYear.getMonth()+1)%12 + 1) == 1 &&
                <Text style={styles.text}>{monthYear.getFullYear()+1}</Text>
            }

            {
                ((monthYear.getMonth()+1)%12 + 1) != 1 &&
                <Text style={styles.text}>{monthYear.getFullYear()}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        width: '100%',
        flexDirection: 'row',
        alignContent: 'flex-start',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 25
    }
});