import { truncateTitle } from '../../utils';
import { useState } from 'react';
import './Event.scss';
import EventModal from '../EventModal/EventModal';
import { IEvent } from '../../types';
import { getCalendarData, getSelectedDate } from '../../redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { setCalendarData } from '../../redux/slices/calendarSlice';

function Event({ event }: { event: IEvent }) {
	const dispatch = useDispatch();

	const calendarData = useSelector(getCalendarData);
	const selectedDate = useSelector(getSelectedDate);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEventModalOpen = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleUpdateCalendarData = (updatedEvent: IEvent) => {
		const updatedData = calendarData.map((yearObj) => {
			if (+Object.keys(yearObj)[0] === selectedDate.year) {
				const updatedYear = {
					[selectedDate.year]: {
						...yearObj[selectedDate.year],
						[selectedDate.month]: {
							...yearObj[selectedDate.year][selectedDate.month],
							[selectedDate.day]: {
								...yearObj[selectedDate.year][selectedDate.month][selectedDate.day],
								events: yearObj[selectedDate.year][selectedDate.month][
									selectedDate.day
								].events.map((event) =>
									event.id === updatedEvent.id ? updatedEvent : event
								),
							},
						},
					},
				};
				return updatedYear;
			}
			return yearObj;
		});
		handleCloseModal();
		dispatch(setCalendarData(updatedData));
	};
	return (
		<>
			<li className='event-item' onClick={handleEventModalOpen}>
				{truncateTitle(event.title, 30)}
			</li>
			{isModalOpen && (
				<EventModal
					setValues={handleUpdateCalendarData}
					event={event}
					type='update'
					onClose={handleCloseModal}
				/>
			)}
		</>
	);
}

export default Event;
