import {
	Ref,
	prop,
	getModelForClass,
	ModelOptions,
} from '@typegoose/typegoose';
import { Product } from './product.model';

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

	@prop({ ref: () => Product, required: true })
	products!: Ref<Product>[];
}

export const saleModel = getModelForClass(Sale);
