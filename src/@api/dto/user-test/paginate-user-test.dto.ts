import { PartialType, IntersectionType } from '@nestjs/swagger';
import { GetAllUserTestDto } from './all-user-test.dto';
import { PaginationParams } from '@share/interfaces/paginate-params.dto';

export class PaginateUserTestDto extends IntersectionType(
	PartialType(PaginationParams),
	PartialType(GetAllUserTestDto),
) {}
