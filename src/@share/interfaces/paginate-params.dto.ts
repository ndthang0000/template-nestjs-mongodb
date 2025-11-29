import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class PaginationParams {
	@ApiProperty({ required: false, default: 1 })
	@IsOptional()
	@Type(() => Number)
	@Min(1)
	page: number = 1;

	@ApiProperty({ required: false, default: 10 })
	@IsOptional()
	@Type(() => Number)
	@Min(1)
	limit: number = 10;

	@ApiProperty({ required: false })
	@IsOptional()
	sortBy: string;
}
