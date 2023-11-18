import Calendar from '../Calendar/Calendar';
import CurrentDayComponent from '../CurrentDayComponent/CurrentDayComponent';
import './CalendarComponent.scss';

function CalendarComponent() {
	return (
		<div className='calendar-component'>
			<CurrentDayComponent />
			<Calendar />
		</div>
	);
}

export default CalendarComponent;
