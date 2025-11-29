import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ADMIN_ROLE_ENUM, ALL_ROLE_ENUM, USER_ROLE_ENUM } from './role.constant';
import { envData } from '@core/config/core.config';

export const getSecretKey = (role: string = 'USER', type: 'access' | 'refresh') => {
	switch (role) {
		case USER_ROLE_ENUM.USER:
			if (type === 'access') {
				return envData.jwt.secretUser;
			}
			return envData.jwt.refreshSecretUser;
		case ADMIN_ROLE_ENUM.ADMIN:
			if (type === 'access') {
				return envData.jwt.secretAdmin;
			}
			return envData.jwt.refreshSecretAdmin;
	}
};

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private reflector: Reflector,
	) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
		const request = context.switchToHttp().getRequest();
		const rawToken = request.headers.authorization;

		if (!rawToken) return false;

		if (!rawToken.startsWith('Bearer ')) return false;

		const token = rawToken.split(' ')[1];
		const requiredRole = (requiredRoles && requiredRoles.length) > 0 ? requiredRoles : null;

		// required role
		try {
			const { role: tokenRole } = this.jwtService.decode(token);
			if (!tokenRole || ALL_ROLE_ENUM[tokenRole] === undefined) {
				return false;
			}
			const secretKey = getSecretKey(tokenRole, 'access');
			const decoded = this.jwtService.verify(token, {
				secret: secretKey,
			});
			request.user = decoded;
			if (requiredRole) {
				return requiredRoles.includes(tokenRole) ? true : false;
			} else {
				return true;
			}
		} catch (e) {
			if (e.name === 'TokenExpiredError') {
				throw new UnauthorizedException('Token expired');
			} else {
				return false;
			}
		}
	}
}
