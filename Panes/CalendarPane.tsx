import React, { useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { Agenda, AgendaSchedule} from 'react-native-calendars';
import { EventView } from '../PaneComponents/CalendarPaneComponents/EventView';
import { formatAgendaSchedule } from '../utilities/formatAgendaSchedule'

import { Event, Event_Data} from '../Database/Event';
import styles from './PaneStyles';

import { EventForm } from '../PaneComponents/CalendarPaneComponents/EventForm';

const CalendarPane = () => {
  const [agendaItems, setItems] = useState<AgendaSchedule>(
    {} as AgendaSchedule
  );
  
  return (
    <View style={styles.calenderPane}>
  
    <EventForm></EventForm>
    
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

        style={calendar_styles.agenda}>
      </Agenda>
  
  </View>
  )
}

const calendar_styles = StyleSheet.create({
  agenda: {
    height: '100%', 
    width: '100%', 
    position: 'relative'
  }
});

export default CalendarPane;