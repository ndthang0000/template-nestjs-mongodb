import moment from 'moment';

export const genEnumDes = (enumName: any): string => {
	return `Values in : [${Object.values(enumName)
		.map((value: string) => value)
		.join(', ')}]`;
};

export const genDate = (dayPlus: number = 0): string => {
	return moment(new Date()).add(dayPlus, 'day').startOf('day').format('YYYY-MM-DD');
};

export const genDateTime = (dayPlus: number = 0): string => {
	return moment(new Date()).add(dayPlus, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
};
