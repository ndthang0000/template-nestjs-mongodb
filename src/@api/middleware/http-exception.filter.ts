import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { envData } from '../../@core/config/core.config';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	private logger = new Logger(HttpExceptionFilter.name);
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		let message = exception.message;

		if (typeof exception.getResponse() === 'object') {
			if ((exception.getResponse() as any)?.message) {
				try {
					if (Array.isArray((exception.getResponse() as any)?.message)) {
						message = (exception.getResponse() as any)?.message.join('; ');
					} else if (typeof (exception.getResponse() as any)?.message === 'object') {
						message = JSON.stringify((exception.getResponse() as any)?.message);
					} else {
						message = (exception.getResponse() as any)?.message;
					}
				} catch (error) {
					message = (exception.getResponse() as any)?.message;
				}
			}
		}
		if (envData.env === 'local') {
			// for debug in local
			console.log(exception);
		} else {
			this.logger.error({
				code: status,
				message: message,
				status: false,
				path: request.url,
			});
		}

		response.status(status).json({
			code: status,
			message: message,
			status: false,
			path: request.url,
		});
	}
}
