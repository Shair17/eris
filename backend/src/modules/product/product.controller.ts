import { Controller, GET as Get, POST as Post } from 'fastify-decorators';
import { ProductService } from './product.service';
import {
	GetProductsSchema,
	CreateProductSchema,
	GetProductByIdSchema,
} from './product.schema';
import {
	hasBearerToken,
	isUserAdmin,
	isUserAuthenticated,
} from '../../hooks/auth.hooks';
import { GetProductsDto, CreateProductDto } from './product.dto';
import { Request, Reply } from '../../interfaces/http.interfaces';

@Controller('/products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get('/', {
		// schema: GetProductsSchema,
		preHandler: [hasBearerToken, isUserAuthenticated],
	})
	async getProducts(request: Request, reply: Reply) {
		return this.productService.getProducts();
	}

	@Get('/:id', {
		schema: GetProductByIdSchema,
		preHandler: [hasBearerToken, isUserAuthenticated],
	})
	async getProductById(
		request: Request<{ Params: { id: string } }>,
		reply: Reply
	) {
		const { id } = request.params;

		return this.productService.getProductById(id);
	}

	@Post('/create', {
		schema: CreateProductSchema,
		preHandler: [hasBearerToken, isUserAuthenticated],
	})
	async createProduct(
		request: Request<{ Body: CreateProductDto }>,
		reply: Reply
	) {
		const { name, price, stock, image } = request.body;

		return this.productService.createProduct({ name, price, stock, image });
	}
}
