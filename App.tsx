import React from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { isPropertySignature } from 'typescript';


interface GreetingProps {
  name: string
}

export default function App() {
  return (
    <View style={{padding: 10, flex: 1}}>
      <Text style={{color: 'green'}}>{"test"}</Text>
      <View style={styles.classesButton}>
        <Button
          title="Classes"
          onPress={() => Alert.alert('No implementation for classes yet')}
          color='blue'
        />
      </View>
      <View style={styles.mapButton}>
        <Button
          title="Map"
          onPress={() => Alert.alert('No Map yet, either')}
          color='black'
          />
      </View>
    </View>
  );
}

const Greeting = (props: any) => {
  return (<View style={{top: 250}}>
    <Text> Hello {props.name}</Text>
  </View>)
}

const styles = StyleSheet.create({
  mainView: {
    bottom: 0,
    position: 'absolute',
  },
  classesButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: 200,
    borderRadius: 4,
    borderWidth: 1,
    elevation: 3,
    backgroundColor: 'gold',
    borderColor: '#000',
  },
  mapButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: 200,
    borderRadius: 4,
    borderWidth: 1,
    elevation: 3,
    backgroundColor: 'gold',
    borderColor: '#000',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});