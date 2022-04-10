import { Service } from 'fastify-decorators';

@Service()
export class SaleService {
	constructor() {}

	getApp(): string {
		return 'Hello world';
	}
}
