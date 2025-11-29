import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './middleware/http-exception.filter';
import { UserAgentMiddleware } from './middleware/user-agent.middleware';
import { GuardModule } from './@guard/guard.module';
import { LoggingInterceptor } from './interceptor/logger.interceptor';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { CoreModule } from '@core/core.module';
import { MailerService } from '@core/infrastructure/mail.service';
import { FirebaseService } from '@core/infrastructure/firebase-admin.service';
import { AllControllers } from './controllers';
import { AllServices } from './services';

@Module({
	imports: [CoreModule, GuardModule, ScheduleModule.forRoot(), BullModule.registerQueue({ name: 'bookingQueue' })],
	controllers: [...AllControllers],
	providers: [
		MailerService,
		FirebaseService,
		...AllServices,
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor,
		},
	],
	exports: [ApiModule],
})
export class ApiModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(UserAgentMiddleware).forRoutes({ path: '/*path', method: RequestMethod.ALL });
	}
}
