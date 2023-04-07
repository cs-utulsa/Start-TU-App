import React, { useState, useEffect, FC } from 'react';
import { Text, View,  } from 'react-native';

import styles from './PaneStyles';

import {get_profile_data} from '../api/User'

type UserPaneProps = {
    access_token: string
}

export type UserPaneData = {
    name: string
    email: string
}

const UserPane:FC<UserPaneProps>  = ({access_token}) => {
  
  const [userPaneData, setUserPaneData] = useState<UserPaneData>({} as UserPaneData)
  
  //Upon first rendering this pane, executing this useEffect
  useEffect(() => {

      //Use the access token to get the user profile(fullname, email) from Azure.
      get_profile_data(access_token).then((retrievedData: UserPaneData) => {
        setUserPaneData(retrievedData);
      })
  }, [access_token])


  return(
    <View style={styles.userPane}>
        <Text style={{fontSize: 50}}>{userPaneData.name}</Text>
        <Text style={{fontSize: 20}}>{userPaneData.email}</Text>
    </View>
  )
}

export default UserPane;