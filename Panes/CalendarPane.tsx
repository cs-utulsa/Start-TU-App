import React, { useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { Agenda, AgendaSchedule, AgendaEntry} from 'react-native-calendars';
import { EventView } from '../PaneComponents/CalendarPaneComponents/EventView';
import { formatAgendaSchedule } from '../utilities/formatAgendaSchedule'

import { Event, Event_Data} from '../Database/Event';
import styles from './PaneStyles';

import { EventForm } from '../PaneComponents/CalendarPaneComponents/EventForm';

const CalendarPane = () => {

  //This state keeps track of key-value pairs between dates and AgendaEntries
  //AgendaEntries are objects with a name, height, and day
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

          //Getting the current month and year that is selected
          const currMonth = month.month;
          const currYear = month.year;
          
          //Query the Event database based on the month and year and format the results as
          //[date: string]: [{Name: string, Height: number, Day: string}]
          Event.queryAttributes_MonthYear(currMonth, currYear).then((value: Event_Data[]) => {
            setItems(formatAgendaSchedule(value)); 
          });
        }}

        //Function for rendering all of the agenda entries in the current month
        renderItem = { (item: AgendaEntry) => {
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