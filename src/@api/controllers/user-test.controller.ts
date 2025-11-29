import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UserTestService } from '@service/user-test.service';
import { CreateUserTestDto } from '@dto/user-test/create-user-test.dto';
import { PaginateUserTestDto } from '@dto/user-test/paginate-user-test.dto';
import { UpdateUserTestDto } from '@dto/user-test/update-user-test.dto';
import { GetAllUserTestDto } from '@dto/user-test/all-user-test.dto';
import { responseData, responseMessage } from '@share/interfaces/response-face';
import { ConvertSortBy, validateSortBy } from '@share/utils/sortby';
import omitKey from '@share/interfaces/omit-key.type';
import { USER_SORT_ENUM } from '../constants/user.constants';

@Controller('user-tests')
export class UserTestController {
	constructor(private readonly userTestService: UserTestService) {}

	@Post()
	async create(@Body() dto: CreateUserTestDto) {
		const data = await this.userTestService.createUserTest(dto);
		return responseData(data, 'UserTest created successfully');
	}

	@Get('/paginate')
	async paginate(@Query() dto: PaginateUserTestDto) {
		const enumSort = Object.values(USER_SORT_ENUM);
		const { sortBy = 'createdAt:asc', dateFrom, dateTo } = dto;

		let filter = {};

		if (dateFrom || dateTo) {
			filter['createdAt'] = {
				...(dateFrom && { $gte: new Date(dateFrom) }),
				...(dateTo && { $lte: new Date(dateTo) }),
			};
		}

		const where = omitKey(dto, ['dateFrom', 'dateTo', 'sortBy', 'page', 'limit']);
		filter = Object.assign(filter, where);

		if (!validateSortBy(enumSort, sortBy)) {
			throw new HttpException('Invalid sortBy', HttpStatus.BAD_REQUEST);
		}
		const orderBy = ConvertSortBy(sortBy);

		const data = await this.userTestService.paginateUserTest({
			page: dto.page,
			limit: dto.limit,
			filter,
			order: orderBy,
		});
		return responseData(data);
	}

	@Get('/:id')
	async get(@Param('id') id: string) {
		if (!Types.ObjectId.isValid(id)) {
			throw new BadRequestException('Invalid ID');
		}

		const data = await this.userTestService.getUserTest(id);
		return responseData(data);
	}

	@Get()
	async getAll(@Query() dto: GetAllUserTestDto) {
		const enumSort = Object.values(USER_SORT_ENUM);
		const { sortBy = 'createdAt:asc', dateFrom, dateTo } = dto;

		let filter = {};

		if (dateFrom || dateTo) {
			filter['createdAt'] = {
				...(dateFrom && { $gte: new Date(dateFrom) }),
				...(dateTo && { $lte: new Date(dateTo) }),
			};
		}

		const where = omitKey(dto, ['dateFrom', 'dateTo', 'sortBy']);
		filter = Object.assign(filter, where);

		if (!validateSortBy(enumSort, sortBy)) {
			throw new HttpException('Invalid sortBy', HttpStatus.BAD_REQUEST);
		}
		const orderBy = ConvertSortBy(sortBy);

		const data = await this.userTestService.getAllUserTest({
			filter: filter,
			order: orderBy,
		});
		return responseData(data);
	}

	@Delete('/:id')
	async delete(@Param('id') id: string) {
		if (!Types.ObjectId.isValid(id)) {
			throw new BadRequestException('Invalid ID');
		}

		const deleted = await this.userTestService.deleteUserTest(id);
		return responseMessage(
			deleted ? 'Deleted UserTest successfully' : `Error! Can't delete UserTest`,
			deleted,
			204,
		);
	}

	@Patch('/:id')
	async update(@Param('id') id: string, @Body() dto: UpdateUserTestDto) {
		if (!Types.ObjectId.isValid(id)) {
			throw new BadRequestException('Invalid ID');
		}

		const updated = await this.userTestService.updateUserTest(id, dto);
		return responseData(updated, 'UserTest updated successfully');
	}
}
