import React, { useState, useEffect, FC} from 'react';
import {StyleSheet, Image, Text, View, Pressable, Animated, ScrollView, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmailNavStack, EmailStackParamList } from '../../Navigation/EmailStackNav';

type Props = NativeStackScreenProps<EmailStackParamList, 'EmailView'>
export const EmailView = ({navigation, route }: Props) => {

    
    return(
        <View>
            <Button onPress={() => navigation.goBack()} title = 'Go to EmailListView'></Button>
        </View>
    );
}