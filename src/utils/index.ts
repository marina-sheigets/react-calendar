import { ICalendarData, IMonth } from '../types';

export const WEEKDAYS = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

const MONTHS = [
	{ daysAmount: 31, month: 'January', order: 0 },
	{ daysAmount: 28, month: 'February', order: 1 },
	{ daysAmount: 31, month: 'March', order: 2 },
	{ daysAmount: 30, month: 'April', order: 3 },
	{ daysAmount: 31, month: 'May', order: 4 },
	{ daysAmount: 30, month: 'June', order: 5 },
	{ daysAmount: 31, month: 'July', order: 6 },
	{ daysAmount: 31, month: 'August', order: 7 },
	{ daysAmount: 30, month: 'September', order: 8 },
	{ daysAmount: 31, month: 'October', order: 9 },
	{ daysAmount: 30, month: 'November', order: 10 },
	{ daysAmount: 31, month: 'December', order: 11 },
];

export const truncateTitle = (title: string, maxDisplayLength = 40) => {
	if (title.length > maxDisplayLength) {
		return `${title.substring(0, maxDisplayLength)}...`;
	}
	return title;
};

export const getInitialCurrentDate = () => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonthOrder = currentDate.getMonth();
	const currentMonth = MONTHS.find((month) => month.order === currentMonthOrder)?.month;
	const currentDay = currentDate.getDate();

	return { currentYear, currentDay, currentMonth };
};

export const generateInitialData = () => {
	const { currentYear } = getInitialCurrentDate();

	const leftYear = currentYear - 5;

	const data: ICalendarData[] = [];

	for (let i = 0; i < 10; i++) {
		data.push({ [leftYear + i]: {} });
	}

	data.forEach((yearObj, index) => {
		for (let i = 0; i < MONTHS.length; i++) {
			const monthName = MONTHS[i].month;
			const daysInMonth = MONTHS[i].daysAmount;

			if (!yearObj[leftYear + index][monthName]) {
				yearObj[leftYear + index][monthName] = {};
			}

			for (let day = 1; day <= daysInMonth; day++) {
				const dayOfWeek = getDayOfWeek(leftYear + index, MONTHS[i].month, day);
				const dayName = WEEKDAYS[dayOfWeek];

				yearObj[leftYear + index][monthName][day] = {
					day: dayOfWeek,
					name: dayName,
					events: [],
				};
			}
		}
	});
	return { data };
};

export function parseDate(date: string) {
	const dateArr = date.split('-'); //[year,month,day]

	const incrementedMonthOrder = dateArr[1];
	let monthOrder = parseInt(incrementedMonthOrder);
	monthOrder--;
	if (monthOrder === -1) {
		monthOrder = 11;
	}

	return {
		year: +dateArr[0],
		month: MONTHS.find((month) => month.order === monthOrder)?.month as string,
		day: +dateArr[2],
	};
}

export function getDayOfWeek(year: number, month: string, day: number) {
	let monthOrder = (MONTHS.find((monthObj) => monthObj.month === month)?.order as number) + 1;
	if (monthOrder === 13) {
		monthOrder = 1;
	}

	const date = new Date(`${year}-${month}-${day}`);

	return date.getDay();
}
export const formatDateToInputValue = (year: number, month: string, day: string) => {
	let monthOrder = (MONTHS.find((monthObj) => monthObj.month === month)?.order as number) + 1;
	if (monthOrder === 13) {
		monthOrder = 1;
	}
	return `${year}-${monthOrder > 9 ? monthOrder : `0${monthOrder}`}-${
		+day > 9 ? day : `0${day}`
	}`;
};

export const getPreviousMonth = (currentMonth: string) => {
	let currentMonthIndex = getCurrentMonthIndex(currentMonth);

	const previousMonthIndex = currentMonthIndex === 0 ? 11 : --currentMonthIndex;

	return MONTHS[previousMonthIndex].month;
};

export const getNextMonth = (currentMonth: string) => {
	let currentMonthIndex = getCurrentMonthIndex(currentMonth);

	const nextMonthIndex = currentMonthIndex === 11 ? 0 : ++currentMonthIndex;

	return MONTHS[nextMonthIndex].month;
};

export const getCurrentMonthIndex = (currentMonth: string) => {
	const currentMonthObj = MONTHS.find((monthObj) => monthObj.month === currentMonth) as IMonth;
	const currentMonthIndex = MONTHS.indexOf(currentMonthObj);
	return currentMonthIndex;
};
