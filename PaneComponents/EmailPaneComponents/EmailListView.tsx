import React, { useState, useEffect, FC} from 'react';
import {View, Button, SectionList, SectionListData, DefaultSectionT, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmailNavStack, EmailStackParamList } from '../../Navigation/EmailStackNav';
import { Email_Data } from '../../Database/Email';

type Props = NativeStackScreenProps<EmailStackParamList, 'EmailListView'>

export const EmailListView = ({navigation, route}: Props) => {
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
    const [sectionData, setSectionData] = useState<SectionListData<Email_Data, {month: Date, data: Email_Data[]}>[]>(
        [
            {
                month: new Date(),
                data: [{
                    Id: '6',
                    Sender_Email: 'sender@email',
                    Receiver_Email: 'receiver@email',
                    Folder: 'Inbox',
                    Subject: 'Subject 6',
                    Body: 'sssssss',
                    SentTime: new Date('2022-12-04'),
                    ReceivedTime: new Date('2022-12-04')
                }]
            }
        ]
    );
    
    return(
        <View>
            <SectionList
                sections = {sectionData}
                renderItem = {(item) => {
                    return (<Text>{item.item.Body}</Text>);
                }}
                renderSectionHeader = {(test) => {
                    return (<Text>{test.section.month.toString()}</Text>);
                }}
            ></SectionList>
            <Button onPress={() => navigation.push('EmailView')} title = 'Go to EmailView'></Button>
        </View>
    );
}