import { getCalendarData, getSelectedDate } from '../../redux/selectors';
import { setCalendarData } from '../../redux/slices/calendarSlice';
import { IEvent } from '../../types';
import Input from '../Input/Input';
import './EventModal.scss';
import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

type ModalType = 'create' | 'update';

interface IEventModal {
	event: IEvent;
	onClose: () => void;
	setValues: (newEvent: IEvent) => void;
	type?: ModalType;
}
function EventModal({ type = 'create', event, onClose, setValues }: IEventModal) {
	const dispatch = useDispatch();
	const calendarData = useSelector(getCalendarData);
	const selectedDate = useSelector(getSelectedDate);

	const [title, setTitle] = useState(event.title);
	const [description, setDescription] = useState(event.description);
	const [date, setDate] = useState(event.date);
	const [beginTime, setBeginTime] = useState(event.beginTime);

	const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};
	const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(e.target.value);
	};
	const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDate(e.target.value);
	};
	const handleChangeBeginTime = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBeginTime(e.target.value);
	};

	const handleSetValues = () => {
		setValues({
			id: event.id,
			title: title.trim(),
			description: description.trim(),
			date,
			beginTime,
		});
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		e.preventDefault();
	};

	const handleRemoveEvent = () => {
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
								].events.filter((item) => item.id !== event.id),
							},
						},
					},
				};
				return updatedYear;
			}
			return yearObj;
		});
		onClose();
		dispatch(setCalendarData(updatedData));
	};

	const isDisabled = useMemo(() => {
		return !title.length || !date.length;
	}, [title, date]);

	return (
		<div className='modal-wrapper'>
			<div className='modal'>
				<div className='modal-header'>
					<div className='modal-header__text'>
						<h4>{type === 'create' ? 'Create event' : 'Edit Event'}</h4>
					</div>
					<div className='modal-header__close'>
						<span onClick={onClose}>X</span>
					</div>
				</div>
				<div className='modal-body'>
					<Input
						error={!title.length}
						required
						value={title}
						onChange={handleChangeTitle}
						type='text'
						label='Title'
					/>
					<Input
						error={false}
						required={false}
						value={description}
						onChange={handleChangeDescription}
						type='text'
						label='Description'
					/>
					<div className='input-row'>
						<Input
							error={!date.length}
							required
							value={date}
							onChange={handleChangeDate}
							type='date'
							label='Date'
							min='2018-01-01'
							max='2027-12-31'
							onKeyDown={handleKeyDown}
						/>
						<Input
							error={false}
							required
							value={beginTime}
							onChange={handleChangeBeginTime}
							type='time'
							label='Begin time'
						/>
					</div>
				</div>
				<div className='modal-footer'>
					<div className='modal-footer__btns'>
						{type !== 'create' && <button onClick={handleRemoveEvent}>Remove</button>}
						<button disabled={isDisabled} onClick={handleSetValues}>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EventModal;
