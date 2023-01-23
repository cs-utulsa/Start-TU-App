import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, TouchableOpacity, Switch, TextInput } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { getTokenSourceMapRange, isPropertySignature, setTextRange } from 'typescript';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import styles from './PaneStyles';

const EmailPane = () => (
    <View style={styles.classesPane}>
      <Text> EMAIL IS NOT YET IMPLEMENTED</Text>
    </View>
  );

  export default EmailPane;