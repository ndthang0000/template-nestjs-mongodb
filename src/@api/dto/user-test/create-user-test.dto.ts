import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserTestDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	lastName: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsBoolean()
	status: boolean;
}
