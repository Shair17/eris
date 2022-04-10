import {
	Ref,
	prop,
	getModelForClass,
	ModelOptions,
} from '@typegoose/typegoose';

@ModelOptions({
	schemaOptions: {
		timestamps: true,
	},
})
export class Product {
	@prop({
		required: true,
	})
	public name!: string;

	@prop({
		required: true,
	})
	public price!: number;

	@prop({
		required: true,
	})
	public stock!: number;

	@prop({
		required: true,
	})
	public image!: string;
}

export const productModel = getModelForClass(Product);
