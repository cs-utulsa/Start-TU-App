import React, { useState, useEffect, FC} from 'react';
import {StyleSheet, Image, Text, View, Pressable, Animated, ScrollView, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';


export const EmailListView = () => {
    const navigate = useNavigation();

    return(
        <View>
            <Button onPress={() => console.log('Test')} title = 'Go to EmailView'></Button>
        </View>
    );
}