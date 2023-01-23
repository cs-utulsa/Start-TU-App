import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, TouchableOpacity, Switch, TextInput } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { getTokenSourceMapRange, isPropertySignature, setTextRange } from 'typescript';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import styles from './PaneStyles';

const EmailPane = () => {
    return(
      <View style={styles.emailPane}>
          <Image style={{aspectRatio: 0.63, height: 595}} source={require('../../assets/Outlook.png')} />
      </View>
    )
}

export default EmailPane;