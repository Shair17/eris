import { prop, getModelForClass, ModelOptions } from '@typegoose/typegoose';
import { EMAIL_REGEX } from '../constants/regex';

@ModelOptions({
	schemaOptions: {
		timestamps: true,
	},
})
export class User {
	@prop({
		required: true,
	})
	public fullName!: string;

	@prop({
		required: true,
		unique: true,
		match: EMAIL_REGEX,
	})
	public email!: string;

	@prop({
		required: true,
	})
	public password!: string;

	@prop({
		// required: true,
		default: false,
	})
	public isAdmin!: boolean;

	@prop({
		// required: true,
		default: false,
	})
	public isBanned!: boolean;

	@prop()
	public refreshToken?: string;
}

export const userModel = getModelForClass(User);
