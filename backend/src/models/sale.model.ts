import { prop, getModelForClass, ModelOptions } from '@typegoose/typegoose';

@ModelOptions({
	schemaOptions: {
		timestamps: true,
	},
})
export class Sale {
	@prop({
		required: true,
	})
	public boughtBy!: string;

	@prop({
		required: true,
	})
	public paid!: number;
}

export const saleModel = getModelForClass(Sale);
