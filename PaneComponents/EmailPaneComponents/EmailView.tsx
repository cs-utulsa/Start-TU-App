import React, { useState, useEffect, FC} from 'react';
import {StyleSheet, Image, Text, View, Pressable, Animated, ScrollView, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';


export const EmailView = () => {
    const navigate = useNavigation();
    
    return(
        <View>
            <Button onPress={() => console.log('Test')} title = 'Go to EmailListView'></Button>
        </View>
    );
}