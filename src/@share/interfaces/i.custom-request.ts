export type UserReq = {
	email: string;
	role: string;
	session: string;
	id: number;
	uid: string;
	iat: number;
	exp: number;
};

export interface RequestWithUser extends Request {
	user: {
		email: string;
		role: string;
		id: number;
		uid: string;
		iat: number;
		exp: number;
	};
}
