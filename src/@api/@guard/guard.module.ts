import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { JWTModule } from './jwt.module';

@Module({
	imports: [JWTModule],
	exports: [AuthGuard],
	providers: [AuthGuard],
})
export class GuardModule {}
