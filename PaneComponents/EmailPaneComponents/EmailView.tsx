import React, { useState, useEffect, FC} from 'react';
import {StyleSheet, Image, Text, View, Pressable, Animated, ScrollView, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmailNavStack, EmailStackParamList } from '../../Navigation/EmailStackNav';


export const EmailView = ({navigation}: any) => {

    
    return(
        <View>
            <Button onPress={() => navigation.goBack()} title = 'Go to EmailListView'></Button>
        </View>
    );
}