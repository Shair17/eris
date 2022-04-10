import { Service } from 'fastify-decorators';

@Service()
export class GarageService {
	constructor() {}

	getApp(): string {
		return 'Hello world';
	}
}
