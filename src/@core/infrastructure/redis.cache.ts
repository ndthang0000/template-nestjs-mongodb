import { Global, Injectable } from '@nestjs/common';
import { envData } from '../config/core.config';
import Redis from 'ioredis';

@Global()
@Injectable()
export default class RedisCache {
	private readonly prefix: string = envData.redis.prefix;
	private readonly redisClient: Redis;

	constructor() {
		this.redisClient = new Redis({
			host: envData.redis.host,
		});
	}

	private addPrefix(key: string): string {
		return `${this.prefix}:${key}`;
	}

	public getClient(): Redis {
		return this.redisClient;
	}

	async get(key: string): Promise<string | null> {
		const prefixedKey = this.addPrefix(key);
		return await this.redisClient.get(prefixedKey);
	}

	async set(key: string, value: string, ttlInSeconds?: number): Promise<void> {
		const prefixedKey = this.addPrefix(key);
		if (ttlInSeconds) {
			await this.redisClient.set(prefixedKey, value, 'EX', ttlInSeconds);
		} else {
			await this.redisClient.set(prefixedKey, value);
		}
	}

	async delete(key: string): Promise<void> {
		const prefixedKey = this.addPrefix(key);
		await this.redisClient.del(prefixedKey);
	}

	async deleteAllWithPrefixAndSuffix(prefix: string, suffix?: string): Promise<void> {
		const pattern = suffix ? `${this.prefix}:${prefix}:*:${suffix}` : `${this.prefix}:${prefix}:*`;
		const keys = await this.redisClient.keys(pattern);
		if (keys.length > 0) {
			await this.redisClient.del(keys);
		}
	}
}
