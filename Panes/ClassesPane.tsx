import React, { useState } from 'react';
import {View, Image} from 'react-native';

import styles from './PaneStyles';

const ClassesPane = () => {
    return(
      <View style={styles.classesPane}>
        <Image style={{aspectRatio: 0.63, height: 595}} source={require('../assets/Harvey.png')} />
      </View>
    )
}

export default ClassesPane;