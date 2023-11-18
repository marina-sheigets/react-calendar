import CalendarCells from '../CalendarCells/CalendarCells';
import Filtering from '../Filtering/Filtering';
import './Calendar.scss';

function Calendar() {
	return (
		<div className='calendar-wrapper'>
			<Filtering />
			<CalendarCells />
		</div>
	);
}

export default Calendar;
