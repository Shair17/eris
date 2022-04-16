import { Controller, GET as Get, POST as Post } from 'fastify-decorators';
import { GarageService } from './garage.service';
import { Reply, Request } from '../../interfaces/http.interfaces';
import { hasBearerToken, isUserAuthenticated } from '../../hooks/auth.hooks';
import { AddGarageSchema } from './garage.schema';
import { AddGarageDto } from './garage.dto';

@Controller('/garages')
export class GarageController {
	constructor(private readonly garageService: GarageService) {}

	@Get('/', {
		preHandler: [hasBearerToken, isUserAuthenticated],
	})
	async getGarages() {
		return this.garageService.getGarages();
	}

	@Get('/type/:type', {
		preHandler: [hasBearerToken, isUserAuthenticated],
	})
	async getGaragesByVehicleType(
		request: Request<{ Params: { type: string } }>,
		reply: Reply
	) {
		const { type } = request.params;

		return this.garageService.getGaragesByVehicleType(type);
	}

	@Post('/', {
		schema: AddGarageSchema,
		preHandler: [hasBearerToken, isUserAuthenticated],
	})
	async addGarage(request: Request<{ Body: AddGarageDto }>, reply: Reply) {
		const { type, paid, placa, owner, entry, exit, receivedBy } = request.body;

		return this.garageService.addGarage({
			type,
			paid,
			placa,
			owner,
			entry,
			exit,
			receivedBy,
		});
	}

	@Get('/:id', {
		preHandler: [hasBearerToken, isUserAuthenticated],
	})
	async getGarageById(
		request: Request<{ Params: { id: string } }>,
		reply: Reply
	) {
		const { id } = request.params;
		return this.garageService.getGarageById(id);
	}
}
