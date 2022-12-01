import React, { useState, useEffect, FC } from 'react';
import {StyleSheet, TouchableOpacity, Image, Modal, Text, View, TextInput} from 'react-native'
import {Location, Location_Data} from '../../Database/Location';

type RoutingPopupProps = {
    popupVisible: boolean;
    // test: React.Dispatch<React.SetStateAction<Location_Data[]>>
}

export const RoutingPopup = () => {
    const [viewPopup, toggleViewPopup] = useState<boolean>(false)

    return(
        <TouchableOpacity disabled = {false} onPress = {() => {
          toggleViewPopup(!viewPopup);
        }} activeOpacity = {1} style = {styles.button} >
          {!viewPopup && <Image style={styles.icon} source={require('../../assets/Directions.png')}></Image>}

          <Modal
            animationType="slide"
            transparent={true}
            visible={viewPopup}>
            
            <View style={styles.popupView}>
              <View style={styles.textInputViewTo}>
                <TextInput placeholder="To:" style={styles.textInput}></TextInput>
              </View>
              <View style={styles.textInputViewFrom}>
              <TextInput placeholder="From: " style={styles.textInput}></TextInput>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
      position: "relative",
      top: 380,
      justifyContent: "center",
      alignSelf: "center",
      width: 200,
      height: 100,
      backgroundColor: 'white',
      borderRadius: 20,
      borderColor: "black",
      borderWidth: 2.5
    },

    button: {
      position: 'absolute',
      top: 15,
      left: 10,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      transform: [{ rotate: "45deg" }],
      //backgroundColor: 'white'
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
      //transform: [{ rotate: "45deg" }],
      // borderRadius: 100,
      //backgroundColor: 'white'
    }
});