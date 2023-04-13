import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CalendarPane from '../Panes/CalendarPane';
import ClassesPane from '../Panes/ClassesPane';
import EmailPane from '../Panes/EmailPane';
import MapPane from '../Panes/MapPane';
import UserPane from '../Panes/UserPane';
import GuestPane from '../Panes/GuestPane';

const Tab = createBottomTabNavigator();

const TabBank = () => {
    return (
        <Tab.Navigator
            tabBarOptions = {{

                
            }}
        >
            <Tab.Screen name='CalendarPane' component={CalendarPane}/>
            <Tab.Screen name='ClassesPane' component={ClassesPane}/>
            <Tab.Screen name='EmailPane' component={EmailPane}/>
            <Tab.Screen name='MapPane' component={MapPane}/>
            <Tab.Screen name='UserPane' component={UserPane}/>
            <Tab.Screen name='GuestPane' component={GuestPane}/>
        </Tab.Navigator>
    )
}

const App = () => {
    return (
        <NavigationContainer>
            <TabBank/>
        </NavigationContainer>
    )
}