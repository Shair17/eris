import { Service } from 'fastify-decorators';
import { DocumentType } from '@typegoose/typegoose';
import { Product, productModel } from '../../models/product.model';
import { CreateProductDto } from './product.dto';
import { BadRequest } from 'http-errors';

@Service()
export class ProductService {
	constructor() {}

	async getProductById(id: string) {
		const product = await productModel.findById(id);

		if (!product) {
			throw new BadRequest();
		}

		return product;
	}

	async getProducts() {
		return await productModel.find().exec();
	}

	async createProduct({ name, price, stock, image }: CreateProductDto) {
		const productExists = await productModel.findOne({ name }).exec();

		if (productExists) {
			throw new BadRequest('producto_ya_registrado');
		}

		const product = new productModel({
			name,
			price,
			stock,
			image,
		});

		await product.save();

		return product;
	}
}
