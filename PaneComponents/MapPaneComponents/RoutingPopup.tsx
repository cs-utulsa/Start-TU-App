import React, { useState, useEffect, FC } from 'react';
import {StyleSheet, Image, Modal, Text, View, TextInput, Button, Pressable, ImageBackground} from 'react-native'
import {Location, Location_Data} from '../../Database/Location';

type RoutingPopupProps = {
    updateEndpoints: (newOrigin: Location_Data, newDestination: Location_Data) => void,
}
const Lorton_Hall: Location_Data = {
  Name: "Lorton Hall",
  Description: "Building of the Department of Psychology",
  Latitude: 36.15142254421786,
  Longitude: -95.94796814388067,
  Tags: ["all", "a&s"]
};

const Chapman_Hall: Location_Data = {
  Name: "Chapman Hall",
  Description: "Building of the Kendall College of Arts & Science",
  Latitude: 36.15308684418934,
  Longitude: -95.94790750389673,
  Tags: ["all", "a&s"]
};


export const RoutingPopup: FC<RoutingPopupProps> = ({updateEndpoints}) => {
    const [viewPopup, toggleViewPopup] = useState<boolean>(false)
    const [origin, setOrigin] = useState<Location_Data>(Lorton_Hall);
    const [destination, setDestination] = useState<Location_Data>(Chapman_Hall);  

    return(
        <Pressable disabled = {false} onPress = {() => {
          toggleViewPopup(!viewPopup);
        }} style = {styles.button} >

        <Image source={require('../../assets/Directions.png')} style={styles.icon}></Image>
            <Modal
              animationType="slide"
              transparent={true}
              visible={viewPopup}
              onDismiss ={() => {
                updateEndpoints(origin, destination);
              }}>
              
              <View style={styles.popupView}>
                <View style={styles.textInputViewTo}>
                  <TextInput placeholder="Origin:" style={styles.textInput} onSubmitEditing = {(e) => {
                    Location.queryAttributes_Name(e.nativeEvent.text).then((value: Location_Data) => {
                      if (value != undefined) {
                        setOrigin(value);
                      }
                    })
                  }}></TextInput>
                </View>

                <View style={styles.textInputViewFrom}>
                  <TextInput placeholder="Destination: " style={styles.textInput} onSubmitEditing = {(e) => {
                    Location.queryAttributes_Name(e.nativeEvent.text).then((value: Location_Data) => {
                      if (value != undefined) {
                        setDestination(value);
                      }
                    })
                  }}></TextInput>
                </View>

                <Pressable onPress={() => {toggleViewPopup(!viewPopup)}} style={styles.onPressRoute}>
                  <Text>Route</Text>
                </Pressable>
              </View>
            </Modal>
          
          </Pressable>
    
        
    )
}

const styles = StyleSheet.create({
    onPressRoute: {
      alignSelf: 'flex-start',
      left: 77,
      //backgroundColor: 'black'
    },
    textInputViewTo: {
      position: "relative",
      alignContent: "flex-start",
      top: 5,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 195,
    },
    textInputViewFrom: {
      position: "relative",
      alignContent: "flex-start",
      top: -5,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 195,
    },
    textInput: {
      alignSelf: 'flex-start',
      width: 195,
      backgroundColor: "#DADADA",
    },

    popupView: {
      position: "absolute",
      top: 380,
      justifyContent: "center",
      alignSelf: "center",
      width: 200,
      height: 100,
      backgroundColor: 'white',
      borderRadius: 20,
      borderColor: "black",
      borderWidth: 2.5,
    
    },

    button: {
      position: 'relative',
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      transform: [{ rotate: "360deg" }],
      //backgroundColor: 'grey'
    },
  
    icon:{
      alignSelf: 'flex-start',
      height: 60,
      width: 60,
      top: 4,
      left: -5
    }
});