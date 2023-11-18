import Event from '../Event/Event';
import { useMemo } from 'react';
import './EventsList.scss';
import { IEvent } from '../../types';

interface IEventsList {
	events: IEvent[];
}

function EventsList({ events = [] }: IEventsList) {
	const isScroll = useMemo(() => events?.length > 10, [events]);

	if (!events.length) {
		<>There are no events</>;
	}
	return (
		<div className='events-list' style={{ overflowY: isScroll ? 'scroll' : 'hidden' }}>
			{events.map((event) => (
				<Event key={event.id} event={event} />
			))}
		</div>
	);
}

export default EventsList;
