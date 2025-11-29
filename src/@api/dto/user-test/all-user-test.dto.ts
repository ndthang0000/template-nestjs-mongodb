import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserTestDto } from './create-user-test.dto';
import { ApiProperty, PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { genEnumDes } from '@share/interfaces/des-enum';
import { USER_SORT_ENUM } from '../../constants/user.constants';

export class GetAllUserTestDto extends PartialType(CreateUserTestDto) {
	@IsNumber()
	@IsOptional()
	@ApiProperty()
	@ApiPropertyOptional()
	@Type(() => Number)
	id: number;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: '2021-01-31' })
	@ApiPropertyOptional()
	dateFrom!: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: '2025-12-31' })
	@ApiPropertyOptional()
	dateTo!: string;

	@ApiProperty({ example: genEnumDes(USER_SORT_ENUM) })
	@IsOptional()
	@ApiPropertyOptional()
	sortBy: string;

	@IsBoolean()
	@IsOptional()
	@ApiProperty({ example: false })
	@ApiPropertyOptional()
	@Transform(({ value }) => value === 'true' || value === true)
	status: boolean;
}
