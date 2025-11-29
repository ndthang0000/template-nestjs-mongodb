import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ALL_ROLE } from './role.constant';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<ALL_ROLE[]>('roles', [
			context.getHandler(),
			context.getClass(),
		]);

		if (!requiredRoles) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();
		return requiredRoles.some(role => role?.includes(user.role));
	}
}
