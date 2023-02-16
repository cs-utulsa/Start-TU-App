import React from 'react';
import { Text, Image, View} from 'react-native';


import styles from './PaneStyles';

const GuestPane = () => {
    return(
      <View style={styles.emailPane}>
          <Text>That's a nice aegument</Text>
          <Text>Unfortunately</Text>
          <Text>you're mother</Text>
          <Image
            style={{width:400,height:400}}
            source={require('../assets/nanayashiki.png')}
          /> 
      </View>
    )
}

export default GuestPane;