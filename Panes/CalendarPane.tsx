import React, { useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { Agenda, AgendaSchedule} from 'react-native-calendars';
import { EventView } from '../PaneComponents/CalendarPaneComponents/EventView';
import { formatAgendaSchedule } from '../utilities/formatAgendaSchedule'

import { Event, Event_Data} from '../Database/Event';

const CalenderPane = () => {

    const [agendaItems, setItems] = useState<AgendaSchedule>(
      {} as AgendaSchedule
    );
    
    return (
    <View style={styles.calenderPane}>
      <Agenda
        items={agendaItems}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={month => {
          const currMonth = month.month;
          const currYear = month.year;
  
          Event.queryAttributes_MonthYear(currMonth, currYear).then((value: Event_Data[]) => {
            setItems(formatAgendaSchedule(value)); 
          });
        }}
  
        renderItem = { (item) => {
          return <EventView 
                  Name={item.name} Height={item.height} Day={item.day}></EventView>
        }}
  
        style={{height: '100%', width: '100%'}}
  
      ></Agenda>
    </View>)
};

const styles = StyleSheet.create({
    calenderPane: {
        flex: 9,
        backgroundColor: 'white',
        paddingLeft: 3
    }
});