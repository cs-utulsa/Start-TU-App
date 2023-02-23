import React from 'react';
import { Text, Image, View} from 'react-native';


import styles from './PaneStyles';

const GuestPane = () => {
    return(
      <View style={styles.emailPane}>
          <Text>This pane is not available to guest users</Text>
      </View>
    )
}

export default GuestPane;