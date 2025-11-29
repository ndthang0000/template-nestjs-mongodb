import { Global, Injectable } from '@nestjs/common';
import Redlock from 'redlock';
import Redis from 'ioredis';
import RedisCache from './redis.cache';
import { envData } from '@core/config/core.config';

@Global()
@Injectable()
export default class RedlockService {
	private readonly prefix: string = envData.redis.prefix;
	private redlock: Redlock;

	constructor() {
		const redisCache = new RedisCache();
		const redisClient: Redis = redisCache.getClient();

		this.redlock = new Redlock([redisClient], {
			driftFactor: 0.01,
			retryCount: 25,
			retryDelay: 200,
			retryJitter: 200,
			automaticExtensionThreshold: 500,
		});
	}

	async acquireLock(resourceKey: string, ttl = 5000) {
		const key = `${this.prefix}:${resourceKey}`;
		return this.redlock.acquire([key], ttl);
	}
}
