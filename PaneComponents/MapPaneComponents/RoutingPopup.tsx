import React, { useState, useEffect, FC } from 'react';
import {StyleSheet, TouchableOpacity, Image, Modal, Text, View, TextInput, Button, ImageBackground} from 'react-native'
import {Location, Location_Data} from '../../Database/Location';

type RoutingPopupProps = {
    popupVisible: boolean;
    // test: React.Dispatch<React.SetStateAction<Location_Data[]>>
}

export const RoutingPopup = () => {
    const [viewPopup, toggleViewPopup] = useState<boolean>(false)
    const [tempOrigin, setTempOrigin] = useState<string>("Mcfarlin Library");
    const [tempDestination, setTempDestination] = useState<string>("Keplinger Hall");

    const [top, setTop] = useState<number>(10);
    const [left, setLeft] = useState<number>(3);

    return(
        <TouchableOpacity disabled = {false} onPress = {() => {
          toggleViewPopup(!viewPopup);
        }} activeOpacity = {1} style = {styles.button} >
          <Image style={{position: 'absolute',
            top: top,
            left: left,
            width: 54,
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5}} source={require('../../assets/Directions.png')}></Image>
          
            <Modal
              animationType="slide"
              transparent={true}
              visible={viewPopup}
              onDismiss ={() => {
                console.log(tempOrigin);
                console.log(tempDestination);
                console.log('Modal closed');
              }}
              onShow = {() => {setTop(-7.5); setLeft(-5)}}>

            
            <View style={styles.popupView}>
              <View style={styles.textInputViewTo}>
                <TextInput placeholder="To:" style={styles.textInput} onSubmitEditing = {(e) => {
                  setTempOrigin(e.nativeEvent.text);
                }}></TextInput>
              </View>

              <View style={styles.textInputViewFrom}>
                <TextInput placeholder="From: " style={styles.textInput} onSubmitEditing = {(e) => {
                  setTempDestination(e.nativeEvent.text)
                }}></TextInput>
              </View>

              <Button title={"Close"} onPress = {() => {toggleViewPopup(!viewPopup)}}></Button>
            </View>
          </Modal>
          
          </TouchableOpacity>
    
        
    )
}

const styles = StyleSheet.create({
    onPressRoute: {
      backgroundColor: 'black'
    },
    textInputViewTo: {
      position: "relative",
      alignContent: "flex-start",
      top: -5,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 195,
    },
    textInputViewFrom: {
      position: "relative",
      alignContent: "flex-start",
      top: -15,
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
      top: 20,
      left: 12,
      width: 35,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      //transform: [{ rotate: "45deg" }],
      //backgroundColor: 'black'
    },
  
    icon:{
      position: 'absolute',
      top: 8,
      left: 3,
      width: 54,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      // transform: [{ rotate: "45deg" }],
      // borderRadius: 100,
      //backgroundColor: 'white'
    }
});