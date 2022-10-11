import React from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';

export default function App() {
  return (
    <Button 
      title="Press me"
      onPress={() => Alert.alert('Simple Button Pressed')}  
    />
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});