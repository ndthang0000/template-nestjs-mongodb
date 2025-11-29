import { DeleteResult, FilterQuery, HydratedDocument, Model, UpdateQuery, UpdateResult } from 'mongoose';

export interface PaginateQuery<T> {
	page?: number; // default: 1
	limit?: number; // default: 10
	filter?: FilterQuery<T>;
	sortBy?: any;
	populate?: string[];
	select?: any;
}

export interface PaginateResponse<T> {
	results: T[];
	totalResults: number;
	page: number;
	limit: number;
	totalPages: number;
}

export class BaseRepository<T> {
	constructor(protected readonly model: Model<T>) {}

	async add(data: Partial<T>): Promise<T> {
		return await this.model.create(data);
	}

	async multipleAdd(data: Partial<T>[]): Promise<HydratedDocument<T>[]> {
		const docs = await this.model.insertMany(data);
		return docs as HydratedDocument<T>[];
	}

	async findAll(filter: FilterQuery<T> = {}, populate?: string | string[], sort?: any): Promise<T[]> {
		let query = this.model.find(filter);

		if (populate) query = query.populate(populate);
		if (sort) query = query.sort(sort);

		return await query.exec();
	}

	async findOneById(id: string, populate?: string | string[]): Promise<T | null> {
		let query = this.model.findById(id);
		if (populate) query = query.populate(populate);
		return await query.exec();
	}

	async findOne(filter: FilterQuery<T>, populate?: string | string[]): Promise<T | null> {
		let query = this.model.findOne(filter);
		if (populate) query = query.populate(populate);
		return await query.exec();
	}

	async updateOne(filter: FilterQuery<T>, data: UpdateQuery<T>): Promise<UpdateResult> {
		return await this.model.updateOne(filter, data).exec();
	}

	async updateMultiple(filter: FilterQuery<T>, data: UpdateQuery<T>): Promise<UpdateResult> {
		return await this.model.updateMany(filter, data).exec();
	}

	async deleteOne(filter: FilterQuery<T>): Promise<DeleteResult> {
		return await this.model.deleteOne(filter).exec();
	}

	async deleteMultiple(filter: FilterQuery<T>): Promise<DeleteResult> {
		return await this.model.deleteMany(filter).exec();
	}

	async count(filter: FilterQuery<T> = {}): Promise<number> {
		return await this.model.countDocuments(filter).exec();
	}

	async paginate(query: PaginateQuery<T>): Promise<PaginateResponse<T>> {
		const page = query.page && query.page > 0 ? query.page : 1;
		const limit = query.limit && query.limit > 0 ? query.limit : 10;
		const skip = (page - 1) * limit;
		const filter = query.filter || {};

		let mongooseQuery = this.model
			.find(filter)
			.sort(query.sortBy || {})
			.skip(skip)
			.limit(limit);

		if (query.select) mongooseQuery = mongooseQuery.select(query.select);

		if (query.populate) {
			query.populate.forEach(path => {
				mongooseQuery = mongooseQuery.populate(path);
			});
		}
		const [results, totalResults] = await Promise.all([
			mongooseQuery.exec(),
			this.model.countDocuments(filter).exec(),
		]);

		return {
			results,
			totalResults,
			page,
			limit,
			totalPages: Math.ceil(totalResults / limit),
		};
	}
}
