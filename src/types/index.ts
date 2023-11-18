export interface ICalendarData {
	[year: string]: IMonthData;
}

export interface IMonthData {
	[month: string]: IDayData;
}

export interface IDayData {
	[day: string]: IDay;
}

export interface IDay {
	day: number;
	name: string;
	events: IEvent[];
}
export interface IEvent {
	id: number;
	title: string;
	description: string;
	date: string;
	beginTime: string;
}

export interface ICurrentDate {
	year: number;
	month: string;
	day: number;
}

export interface IMonth {
	daysAmount: number;
	month: string;
	order: number;
}
