import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
	private readonly blockedUserAgents: string[] = [
		'curl',
		'wget',
		'bot',
		'crawler',
		'spider',
		'scrapy',
		'python-requests',
		'Go-http-client',
		'libwww-perl',
		'Java',
		'php',
		'httpclient',
	];

	use(req: Request, res: Response, next: NextFunction) {
		const userAgent = req.headers['user-agent'] || '';

		if (this.isBlockedUserAgent(userAgent)) {
			throw new BadRequestException('Access denied: Suspicious User-Agent detected.');
		}

		next();
	}

	private isBlockedUserAgent(userAgent: string): boolean {
		return this.blockedUserAgents.some(blocked => userAgent.toLowerCase().includes(blocked));
	}
}
