import { Event, Event_Data} from '../Database/Event';
import { AgendaSchedule, AgendaEntry} from 'react-native-calendars';

const initialViewHeight: number = 10;

export function formatAgendaSchedule(event_data: Event_Data[]): AgendaSchedule {

    let schedule: AgendaSchedule = {};
    for (let i = 0; i < event_data.length; i++) {
        const ISO_Date: string = event_data[i].Date_Start.toString();
        const agendaDate: string = ISO_Date.substring(0, ISO_Date.indexOf('T'));

        if (schedule[agendaDate] == undefined) {
            schedule[agendaDate] = [{name: event_data[i].Name, height: initialViewHeight, day: agendaDate}];
        } 
        else {
            schedule[agendaDate].push({name: event_data[i].Name, height: initialViewHeight, day: agendaDate});
        }
    }
    return schedule
}