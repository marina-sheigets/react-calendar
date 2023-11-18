import { getCurrentDate, getSelectedDate } from '../../redux/selectors';
import { setSelectedDate } from '../../redux/slices/calendarSlice';
import { formatDateToInputValue, getNextMonth, getPreviousMonth, parseDate } from '../../utils';
import Input from '../Input/Input';
import './Filtering.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useEffect, useState } from 'react';

function Filtering() {
	const selectedDate = useSelector(getSelectedDate);
	const currentDate = useSelector(getCurrentDate);
	const dispatch = useDispatch();
	const [isMobile, setIsMobile] = useState(false);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		e.preventDefault();
	};

	const handleChangeSelectedDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		const obj = parseDate(e.target.value);
		dispatch(setSelectedDate(obj));
	};

	const handleSelectPreviousMonth = () => {
		const previousMonth = getPreviousMonth(selectedDate.month);
		let currentYear = selectedDate.year;
		const newSelectedDate = {
			year: previousMonth === 'December' ? --currentYear : selectedDate.year,
			month: previousMonth,
			day: 1,
		};
		dispatch(setSelectedDate(newSelectedDate));
	};

	const handleSelectNextMonth = () => {
		const nextMonth = getNextMonth(selectedDate.month);
		let currentYear = selectedDate.year;
		const newSelectedDate = {
			year: nextMonth === 'January' ? ++currentYear : selectedDate.year,
			month: nextMonth,
			day: 1,
		};
		dispatch(setSelectedDate(newSelectedDate));
	};

	const handleSetTodaysDate = () => {
		dispatch(setSelectedDate(currentDate));
	};

	const isNextMonthButtonDisabled = useMemo(() => {
		return selectedDate.year === 2027 && selectedDate.month === 'December';
	}, [selectedDate.month, selectedDate.year]);

	const isPreviousMonthButtonDisabled = useMemo(() => {
		return selectedDate.year === 2018 && selectedDate.month === 'January';
	}, [selectedDate.month, selectedDate.year]);

	useEffect(() => {
		setIsMobile(window.innerWidth < 481);
	}, []);
	return (
		<div className='filtering-wrapper'>
			<button
				className='change-month-btn'
				onClick={handleSelectPreviousMonth}
				disabled={isPreviousMonthButtonDisabled}>
				{'<'} {!isMobile && 'Previous Month'}
			</button>
			<div className='date-filter'>
				{!isMobile && 'Select date'}
				<Input
					error={false}
					value={formatDateToInputValue(
						selectedDate.year,
						selectedDate.month,
						String(selectedDate.day)
					)}
					onChange={handleChangeSelectedDate}
					type='date'
					label=''
					min='2018-01-01'
					max='2027-12-31'
					onKeyDown={handleKeyDown}
				/>
				<button className='select-today-btn' onClick={handleSetTodaysDate}>
					Today
				</button>
			</div>
			<button
				className='change-month-btn'
				onClick={handleSelectNextMonth}
				disabled={isNextMonthButtonDisabled}>
				{!isMobile && 'Next Month'} {'>'}
			</button>
		</div>
	);
}

export default Filtering;
