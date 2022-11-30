import React, { useState, useEffect, FC } from 'react';
import {StyleSheet, TouchableOpacity, Image, Modal, Text, View, TextInput} from 'react-native'
import {Location, Location_Data} from '../../Database/Location';

type RoutingPopupProps = {
    popupVisible: boolean;
    // test: React.Dispatch<React.SetStateAction<Location_Data[]>>
}

export const RoutingPopup: FC<RoutingPopupProps> = ({popupVisible}) => {
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={!popupVisible}>
            
            <View style={styles.centeredView}>
              <View style={styles.modal}>
                <Text>Testing Testing</Text>
                {/* <TextInput></TextInput>
                <TextInput></TextInput> */}
              </View>
            </View>
          </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modal:{
        margin: 20,
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 50,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      }
});