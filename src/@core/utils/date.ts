import moment from 'moment';

const initialDate = (date: Date | null = null): Date => {
	if (!date) {
		// null value
		date = new Date();
	} else {
		// any value (string)
		date = new Date(date);
	}
	return date;
};

export const startDate = (date: Date | null = null): Date => {
	return moment(initialDate(date)).startOf('day').toDate();
};

export const endDate = (date: Date | null = null): Date => {
	return moment(initialDate(date)).endOf('day').toDate();
};
