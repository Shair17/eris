import { Controller, GET as Get } from 'fastify-decorators';
import { GarageService } from './garage.service';

@Controller('/garages')
export class GarageController {
	constructor(private readonly garageService: GarageService) {}

	@Get('/')
	async getApp() {
		return this.garageService.getApp();
	}
}
