import { useMemo } from 'react';
import { getCalendarData, getSelectedDate } from '../../redux/selectors';
import { WEEKDAYS, getDayOfWeek } from '../../utils';
import EventsList from '../EventsList/EventsList';
import './CurrentDayComponent.scss';
import { useSelector } from 'react-redux';
import { ICalendarData } from '../../types';

function CurrentDayComponent() {
	const selectedDate = useSelector(getSelectedDate);
	const calendarData = useSelector(getCalendarData);

	const weekDay = useMemo(() => {
		if (!selectedDate) return '';
		const dayNum = getDayOfWeek(selectedDate.year, selectedDate.month, selectedDate.day);
		return dayNum === 0 ? WEEKDAYS[WEEKDAYS.length - 1] : WEEKDAYS[dayNum - 1];
	}, [selectedDate]);

	const events = useMemo(() => {
		if (!calendarData.length) return [];
		const selectedYearObj = calendarData.find(
			(yearObj) => yearObj[selectedDate.year]
		) as ICalendarData;
		return selectedYearObj[selectedDate.year][selectedDate.month][selectedDate.day].events;
	}, [calendarData, selectedDate.day, selectedDate.month, selectedDate.year]);

	if (!calendarData.length) {
		return null;
	}
	return (
		<div className='current-day-wrapper'>
			<h1>{weekDay}</h1>
			<h2>{`${selectedDate.month} ${selectedDate.day}, ${selectedDate.year}`}</h2>
			<EventsList events={events} />
		</div>
	);
}

export default CurrentDayComponent;
