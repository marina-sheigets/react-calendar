import { RootState } from '../store';

export const getCalendarData = (state: RootState) => state.calendar.calendarData;
export const getCurrentDate = (state: RootState) => state.calendar.currentDate;
export const getSelectedDate = (state: RootState) => state.calendar.selectedDate;
