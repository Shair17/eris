import { Service } from 'fastify-decorators';
import { DocumentType } from '@typegoose/typegoose';
import { Garage, garageModel, VehicleType } from '../../models/garage.model';
import { AddGarageDto } from './garage.dto';
import { StatusCodes } from 'http-status-codes';
import { BadRequest } from 'http-errors';

@Service()
export class GarageService {
	constructor() {}

	async getGarages(): Promise<DocumentType<Garage>[] | null> {
		return await garageModel.find();
	}

	async addGarage({
		type,
		paid,
		placa,
		owner,
		entry,
		exit,
		receivedBy,
	}: AddGarageDto) {
		const garage = new garageModel({
			type,
			paid,
			placa,
			owner,
			entry,
			exit,
			receivedBy,
		});

		await garage.save();

		return {
			statusCode: StatusCodes.OK,
			success: true,
			message: 'Garage agregado satisfactoriamente',
		};
	}

	async getGarageById(id: string): Promise<DocumentType<Garage> | null> {
		return await garageModel.findById(id);
	}

	async getGaragesByVehicleType(
		type: string
	): Promise<DocumentType<Garage>[] | null> {
		type = type.toLowerCase().trim();

		if (
			type !== VehicleType.CAMION &&
			type !== VehicleType.CARRO &&
			type !== VehicleType.LINEAL &&
			type !== VehicleType.MOTOTAXI
		) {
			throw new BadRequest();
		}

		return await garageModel.find({ type });
	}
}
