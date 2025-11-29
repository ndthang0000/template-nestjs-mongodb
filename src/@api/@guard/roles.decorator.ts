import { SetMetadata } from '@nestjs/common';
import { ALL_ROLE } from './role.constant';

/**
 * Custom decorator to define roles required for a route.
 * @param roles List of roles allowed to access the route.
 */
export const Roles = (roles: ALL_ROLE[]) => SetMetadata('roles', roles);
