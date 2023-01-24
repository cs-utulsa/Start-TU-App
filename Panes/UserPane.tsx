import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, TouchableOpacity, Switch, TextInput } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { getTokenSourceMapRange, isPropertySignature, setTextRange } from 'typescript';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import styles from './PaneStyles';

const UserPane = () => {
  return(
    <View style={styles.userPane}>
        <Text style={{fontSize: 50}}> Ben</Text>
        <Text style={{fontSize: 20}}> Benjamin Hughes </Text>
        <Text style={{fontSize: 5}}> {"\n"} </Text>
        <Text style={{fontSize: 20}}> bmh7113@utulsa.edu</Text>
        <Text style={{fontSize: 10}}> {"\n"} </Text>
        <Text style={{fontSize: 30}}> Bachelor of Science</Text>
        <Text style={{fontSize: 20}}> Major in Computer Science</Text>
        <Text style={{fontSize: 20}}> Minor in Spanish</Text>
    </View>
  )
}

export default UserPane;