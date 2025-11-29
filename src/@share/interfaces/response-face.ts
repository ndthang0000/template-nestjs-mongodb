export class ResponseData {
	data: any;
	message: string;
	status: boolean;
	code: number;
}

export const responseData = (data: any, message = '', status = true, code = 200) => {
	if (!data) {
		status = false;
	}
	return { data, message, status, code } as ResponseData;
};

export class ResponseMessage {
	message: string;
	status: boolean;
	code: number;
}

export const responseMessage = (message: string, status: boolean, code = 200) => {
	return { message, status, code } as ResponseMessage;
};
