import React, { useState, useEffect, FC} from 'react';
import {StyleSheet, Image, Text, View, Pressable, Animated, ScrollView, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmailNavStack, EmailStackParamList } from '../../Navigation/EmailStackNav';

type Props = NativeStackScreenProps<EmailStackParamList, 'EmailListView'>
export const EmailListView = ({navigation, route}: Props) => {
    
    
    return(
        <View>
            <Button onPress={() => navigation.push('EmailView')} title = 'Go to EmailView'></Button>
        </View>
    );
}