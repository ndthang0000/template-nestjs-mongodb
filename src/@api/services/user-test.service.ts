import { Inject, Injectable } from '@nestjs/common';
import { CreateUserTestDto } from '@dto/user-test/create-user-test.dto';
import { UpdateUserTestDto } from '@dto/user-test/update-user-test.dto';
import { UserTest, UserTestDocument } from '@core/mongodb/schemas/user-test.schema';
import { UserTestRepository } from '@core/mongodb/repository/user-test.repository';
import { Types } from 'mongoose';

@Injectable()
export class UserTestService {
	constructor(@Inject() private readonly userTestRepo: UserTestRepository) {}

	async createUserTest(createDto: CreateUserTestDto): Promise<UserTest> {
		const entity = this.userTestRepo.add(createDto);
		return entity;
	}

	async getUserTest(id: string): Promise<UserTest | null> {
		return this.userTestRepo.findOne({ _id: new Types.ObjectId(id) });
	}

	async updateUserTest(id: string, updateDto: UpdateUserTestDto): Promise<UserTest | null> {
		await this.userTestRepo.updateOne({ _id: new Types.ObjectId(id) }, updateDto);
		return this.getUserTest(id);
	}

	async deleteUserTest(id: string): Promise<boolean> {
		const data = await this.userTestRepo.deleteOne({ _id: new Types.ObjectId(id) });
		if (data.deletedCount === 0) {
			return false;
		}
		return true;
	}

	async paginateUserTest(query: any): Promise<any> {
		return this.userTestRepo.paginate({
			page: query.page,
			limit: query.limit,
			filter: query.filter,
			sortBy: query.sortBy,
			populate: query.populate,
		});
	}

	async getAllUserTest(query: any): Promise<UserTestDocument[]> {
		return this.userTestRepo.findAll(query.filter, query.populate, query.order);
	}
}
