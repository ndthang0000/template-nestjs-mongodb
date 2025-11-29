import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { envData } from '@core/config/core.config';

@Module({
	imports: [
		{
			...JwtModule.register({
				secret: envData.jwt.secretUser,
				signOptions: { expiresIn: envData.jwt.jwtExpiresTime as any },
			}),
			global: true,
		},
	],
	exports: [JwtModule],
})
export class JWTModule {}
