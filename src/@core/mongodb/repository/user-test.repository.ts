import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base-repo';
import { UserTestDocument, UserTest } from '../schemas/user-test.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserTestRepository extends BaseRepository<UserTestDocument> {
	constructor(@InjectModel(UserTest.name) model: Model<UserTestDocument>) {
		super(model);
	}
}
