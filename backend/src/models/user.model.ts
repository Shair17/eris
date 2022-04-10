import { prop, getModelForClass, ModelOptions } from '@typegoose/typegoose';

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
	})
	public email!: string;

	@prop({
		required: true,
	})
	public password!: string;

	@prop({
		required: true,
		default: false,
	})
	public isAdmin!: boolean;

	@prop({
		required: true,
		default: false,
	})
	public isBanned!: boolean;

	@prop()
	public refreshToken?: string;
}

export const userModel = getModelForClass(User);
