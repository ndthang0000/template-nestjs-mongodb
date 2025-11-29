export enum USER_ROLE_ENUM {
	USER = 'USER',
}

export enum ADMIN_ROLE_ENUM {
	ADMIN = 'ADMIN',
}

export enum ALL_ROLE_ENUM {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

export type USER_ROLE = USER_ROLE_ENUM.USER;

export type ADMIN_ROLE = ADMIN_ROLE_ENUM.ADMIN;

export type ALL_ROLE = USER_ROLE | ADMIN_ROLE;

export const getRoles = (a: any): ALL_ROLE[] => {
	return Object.values(a).map((value: string) => value) as ALL_ROLE[];
};
