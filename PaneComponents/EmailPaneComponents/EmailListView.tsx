import React, { useState, useEffect, FC} from 'react';
import {StyleSheet, Image, Text, View, Pressable, Animated, ScrollView, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';


export const EmailListView = ({navigation}: any) => {

    return(
        <View>
            <Button onPress={() => navigation.push('EmailView')} title = 'Go to EmailView'></Button>
        </View>
    );
}