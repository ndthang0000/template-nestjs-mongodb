import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envData } from './@core/config/core.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn', 'log'],
	});

	app.enableCors({
		origin: true,
		credentials: true,
	}); // setup cors

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			// transformOptions: {
			//   enableImplicitConversion: true,
			// },
		}),
	);

	app.setGlobalPrefix('api'); // /api global prefix

	const config = new DocumentBuilder()
		.setTitle(envData.projectName)
		.setDescription('The API description')
		.setVersion('1.0')
		.addTag('Thần Dò Số')
		.addBearerAuth()
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, documentFactory, {
		swaggerOptions: {
			docExpansion: 'none',
		},
	});

	await app.listen(envData.port);
	console.log(`✅ Server running on port http://localhost:${envData.port}`);
	console.log(`✅ Document Swagger running on port http://localhost:${envData.port}/docs`);
}
bootstrap();
