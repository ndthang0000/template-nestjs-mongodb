import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ALL_ROLE_ENUM } from '../@guard/role.constant';
import { getSecretKey } from '../@guard/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsJwtMiddleware {
	constructor(private readonly jwtService: JwtService) {}

	use(socket: Socket, next: Function, roles: string[] = Object.values(ALL_ROLE_ENUM)) {
		try {
			const token = socket.handshake.headers.authorization?.split(' ')[1];

			if (!token) {
				return next(new Error('Authorization token is missing'));
			}
			const { role: tokenRole } = this.jwtService.decode(token);
			if (!tokenRole || ALL_ROLE_ENUM[tokenRole] === undefined) {
				return next(new Error('Invalid token'));
			}

			const secretKey = getSecretKey(tokenRole, 'access');
			socket.data.user = this.jwtService.verify(token, { secret: secretKey });

			if (!socket.data.user) {
				return next(new Error('Invalid permission'));
			}
			if (roles.length > 0 && !roles.includes(socket.data.user.role)) {
				return next(new Error('Invalid permission !!!'));
			}
			next();
		} catch (error) {
			return next(error);
		}
	}
}
