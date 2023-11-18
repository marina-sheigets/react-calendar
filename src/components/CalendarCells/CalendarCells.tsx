import { useState, useEffect, useMemo } from 'react';
import {
	WEEKDAYS,
	formatDateToInputValue,
	generateInitialData,
	getInitialCurrentDate,
	parseDate,
} from '../../utils';
import { ICalendarData, ICurrentDate, IDayData, IEvent } from '../../types';
import './CalendarCells.scss';
import EventModal from '../EventModal/EventModal';
import CalendarDay from '../CalendarDay/CalendarDay';
import { useSelector, useDispatch } from 'react-redux';
import { getCalendarData, getSelectedDate } from '../../redux/selectors';
import {
	changeSelectedMonth,
	setCalendarData,
	setCurrentDate,
	setSelectedDate,
} from '../../redux/slices/calendarSlice';

const CalendarCells = () => {
	const dispatch = useDispatch();
	const [isMobile, setIsMobile] = useState(false);
	const data = useSelector(getCalendarData);
	const selectedDate = useSelector(getSelectedDate);

	const [createdEvent, setCreatedEvent] = useState<IEvent>({
		beginTime: '',
		date: '',
		description: '',
		id: 1,
		title: '',
	});
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		setIsMobile(window.innerWidth < 481);
		const { currentDay: day, currentMonth: month, currentYear: year } = getInitialCurrentDate();
		const calendarDataObj = localStorage.getItem('calendarData');
		const selectedDateObj = localStorage.getItem('selectedDate');
		if (!calendarDataObj || !selectedDateObj) {
			const { data: calendarData } = generateInitialData();

			dispatch(setCalendarData(calendarData));
			dispatch(setSelectedDate({ day, month: month || '', year }));
		} else {
			const parsedCalendarData = JSON.parse(calendarDataObj as string) as ICalendarData[];
			const parsedSelectedDate = JSON.parse(selectedDateObj as string) as ICurrentDate;
			dispatch(setCalendarData(parsedCalendarData));
			dispatch(setSelectedDate(parsedSelectedDate));
		}
		dispatch(setCurrentDate({ day, month: month || '', year }));
	}, []);

	const selectedMonth = useMemo(() => {
		if (!Object.keys(selectedDate)) {
			return {};
		}
		const currentMonthData = data.find((item) => item[selectedDate.year])?.[selectedDate.year][
			selectedDate.month
		] as IDayData;

		return currentMonthData;
	}, [selectedDate, data]);

	const handleSelectDay = (dayOfMonth: string) => {
		dispatch(changeSelectedMonth(+dayOfMonth));
	};

	const handleModalOpen = (dayOfMonth: string) => {
		setIsModalOpen(true);

		setCreatedEvent({
			id: Date.now(),
			beginTime: '12:00',
			date: formatDateToInputValue(selectedDate.year, selectedDate.month, dayOfMonth),
			title: '',
			description: '',
		});
	};

	const handleAddEvent = (newEvent: IEvent) => {
		const { date } = newEvent;

		const { day, month, year } = parseDate(date);

		const updatedData = data.map((yearObj) => {
			if (+Object.keys(yearObj)[0] === year) {
				const updatedYear = {
					[year]: {
						...yearObj[year],
						[month]: {
							...yearObj[year][month],
							[day]: {
								...yearObj[year][month][day],
								events: [newEvent, ...yearObj[year][month][day].events],
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
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleSelectDayOnMobile = (dayOfMonth: string) => {
		handleSelectDay(dayOfMonth);
		handleModalOpen(dayOfMonth);
	};

	if (!selectedMonth) {
		return <div className='table'>Loading...</div>;
	}

	return (
		<div className='table'>
			{WEEKDAYS.map((day) => (
				<div key={day} className='week-day'>
					{isMobile ? day.slice(0, 3) : day}
				</div>
			))}
			{Object.keys(selectedMonth).map((dayOfMonth) => {
				return (
					<CalendarDay
						handleSelectDayOnMobile={handleSelectDayOnMobile}
						isMobile={isMobile}
						key={dayOfMonth}
						currentMonth={selectedMonth}
						dayOfMonth={dayOfMonth}
						handleModalOpen={handleModalOpen}
						handleSelectDay={handleSelectDay}
					/>
				);
			})}

			{isModalOpen && (
				<EventModal
					setValues={handleAddEvent}
					event={createdEvent}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
};

export default CalendarCells;
