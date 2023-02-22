import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image, SectionList, SectionListData, SectionListRenderItem } from 'react-native';
import {StatusBar} from 'expo-status-bar';

import styles from './PaneStyles';
import { Email, Email_Data } from '../Database/Email';
import { Header } from '../PaneComponents/EmailPaneComponents/Header';

//This type specifies the format of the data of the section list for this component.
//monthYear: This acts as a 'key' to identify Email_Data instances
//data: The actual data to display
type emailListData = {
  monthYear: Date,
  data: Email_Data[]
}

const EmailPane = () => {

    const [earliestDate, setEarliestDate] = useState<Date>(new Date());
    const [emailData, setEmailData] = useState<emailListData[]>([] as emailListData[])

    //This useEffect will execute a query to the email table everytime 'earliestDate' gets updated.
    //It will use 'earliestDate' to query all email instances that belong and append them to the 
    //global list state.
    useEffect(() => {
        Email.queryAttributes_MonthYear_ReceivedDate(earliestDate.getMonth()+1, earliestDate.getFullYear())
        .then(
            (result: Email_Data[]) => {
                console.log('Run')
                //Only run an update to the list data if any results were fetched
                if (result.length != 0) {

                    //Getting all of the email instances from the earliest month/year pair,
                    //and append them to the global list state.
                    const previousEmailData: emailListData[] = emailData
                    previousEmailData.push({
                      monthYear: earliestDate,
                      data: result
                    })

                    setEmailData(previousEmailData)
                }
            }
        )
    }, [earliestDate])
    
    return(
      <View style={styles.emailPane}>
          <SectionList 
           sections={emailData}
           renderItem={({item}) => (
              <View style={{width: '100%', height: 80, backgroundColor: 'grey'}}>
                <Text>{item.Id}</Text>
              </View>
           )}

           renderSectionHeader={({section: {monthYear}}) => {
              return(
                <Header monthYear={monthYear}></Header>
              )
           }}
           onRefresh = {() => {
              //Updating the date state to the previous month
              setEarliestDate(new Date(earliestDate.setMonth(earliestDate.getMonth() - 1)));
           }}
           refreshing={false}
           onEndReached = {() => {
              //Updating the date state to the previous month
              setEarliestDate(new Date(earliestDate.setMonth(earliestDate.getMonth() - 1)));
           }}
           onEndReachedThreshold={1}
           style={email_styles.pane}></SectionList>
      </View>
    )
}


const email_styles = StyleSheet.create({
    pane: {
      height: '100%',
      width: '100%',
      backgroundColor: 'white'
    }
});


export default EmailPane;