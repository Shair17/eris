import { prop, getModelForClass, ModelOptions } from '@typegoose/typegoose';

@ModelOptions({
	schemaOptions: {
		timestamps: true,
	},
})
export class Garage {
	@prop({
		required: true,
	})
	public type!: string;

	@prop({
		required: true,
	})
	public paid!: number;

	@prop({
		required: true,
	})
	public placa!: string;

	@prop({
		required: true,
	})
	public owner!: string;

	@prop({
		required: true,
	})
	public entry!: Date;

	@prop({
		required: true,
	})
	public exit!: Date;
}

export const garageModel = getModelForClass(Garage);
