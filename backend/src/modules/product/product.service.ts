import { Service } from 'fastify-decorators';

@Service()
export class ProductService {
	constructor() {}

	getApp(): string {
		return 'Hello world';
	}
}
