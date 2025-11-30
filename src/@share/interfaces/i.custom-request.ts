export type UserReq = {
	email: string;
	role: string;
	session: string;
	avatar: string;
	id: string;
	iat: number;
	exp: number;
};

export interface RequestWithUser extends Request {
	user: {
		email: string;
		role: string;
		session: string;
		avatar: string;
		id: string;
		iat: number;
		exp: number;
	};
}
