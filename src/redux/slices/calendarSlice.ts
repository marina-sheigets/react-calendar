import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICalendarData, ICurrentDate } from '../../types';

export interface CalendarState {
	currentDate: ICurrentDate;
	calendarData: ICalendarData[];
	selectedDate: ICurrentDate;
}

const initialState: CalendarState = {
	currentDate: { year: 1, day: 1, month: 'January' },
	calendarData: [],
	selectedDate: {
		day: 1,
		month: 'January',
		year: 1,
	},
};

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setCurrentDate: (state, action: PayloadAction<ICurrentDate>) => {
			state.currentDate = action.payload;
		},

		setCalendarData: (state, action: PayloadAction<ICalendarData[]>) => {
			localStorage.setItem('calendarData', JSON.stringify(action.payload));
			state.calendarData = action.payload;
		},
		setSelectedDate: (state, action: PayloadAction<ICurrentDate>) => {
			localStorage.setItem('selectedDate', JSON.stringify(action.payload));
			state.selectedDate = action.payload;
		},

		changeSelectedMonth: (state, action: PayloadAction<number>) => {
			state.selectedDate = { ...state.selectedDate, day: action.payload };
			localStorage.setItem('selectedDate', JSON.stringify(state.selectedDate));
		},
	},
});

export const { setCurrentDate, setCalendarData, setSelectedDate, changeSelectedMonth } =
	calendarSlice.actions;

export default calendarSlice.reducer;
