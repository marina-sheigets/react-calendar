import { useState, useMemo } from 'react';
import { getCurrentDate, getSelectedDate } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { IDayData } from '../../types';

interface ICalendarDay {
	currentMonth: IDayData;
	dayOfMonth: string;
	handleModalOpen: (data: string) => void;
	handleSelectDay: (data: string) => void;
}

function CalendarDay({ currentMonth, dayOfMonth, handleModalOpen, handleSelectDay }: ICalendarDay) {
	const currentDate = useSelector(getCurrentDate);
	const selectedDate = useSelector(getSelectedDate);
	const [isButtonVisible, setIsButtonVisible] = useState(false);

	const handleShowButton = () => {
		setIsButtonVisible(true);
	};
	const handleHideButton = () => {
		setIsButtonVisible(false);
	};

	const className = useMemo(
		() =>
			`day ${
				+dayOfMonth === currentDate.day &&
				currentDate.year === selectedDate.year &&
				selectedDate.month === currentDate.month &&
				'current'
			} ${selectedDate.day === +dayOfMonth && 'selected'} `,
		[currentDate, dayOfMonth, selectedDate]
	);
	return (
		<div
			onMouseOver={handleShowButton}
			onMouseOut={handleHideButton}
			onClick={() => handleSelectDay(dayOfMonth)}
			key={dayOfMonth}
			className={className}
			style={{
				gridColumn:
					+currentMonth[dayOfMonth].day !== 0 && +dayOfMonth === 1
						? +currentMonth[dayOfMonth].day
						: 'auto',
			}}>
			<div className='cell-header'>
				{dayOfMonth}
				{isButtonVisible && (
					<button
						title='Add event'
						className='add-btn'
						onClick={() => handleModalOpen(dayOfMonth)}>
						+
					</button>
				)}
			</div>

			{currentMonth[dayOfMonth].events && (
				<div className='event-list'>
					{currentMonth[dayOfMonth].events.map((event) => (
						<div key={event.id}>{event.title}</div>
					))}
				</div>
			)}
		</div>
	);
}

export default CalendarDay;
