import { Controller, GET as Get } from 'fastify-decorators';
import { SaleService } from './sale.service';

@Controller('/sales')
export class SaleController {
	constructor(private readonly saleService: SaleService) {}

	@Get('/')
	async getApp() {
		return this.saleService.getApp();
	}
}
