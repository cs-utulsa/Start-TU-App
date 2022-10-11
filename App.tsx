import React from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { isPropertySignature } from 'typescript';

interface GreetingProps {
  name: string
}

export default function App() {
  return (
    <View style={styles.right}>
      <Greeting name='Ben'/>
    </View>
  );
}

const Greeting = (props: any) => {
  return (<View style={{top: 250}}>
    <Text> Hello {props.name}</Text>
  </View>)
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  },
  left: {
    alignItems: 'flex-start'
  },
  right: {
    alignItems: 'flex-end'
  },
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