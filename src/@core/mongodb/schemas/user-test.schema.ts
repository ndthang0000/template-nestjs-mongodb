import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserTestDocument = HydratedDocument<UserTest>;

@Schema({ timestamps: true })
export class UserTest {
	@Prop()
	firstName: string;

	@Prop()
	lastName: string;

	@Prop()
	email: string;

	@Prop()
	status: boolean;

	@Prop()
	phoneNumber: string;
}

export const UserTestSchema = SchemaFactory.createForClass(UserTest);
