import { Controller, GET as Get } from 'fastify-decorators';
import { ProductService } from './product.service';

@Controller('/products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get('/')
	async getApp() {
		return this.productService.getApp();
	}
}
