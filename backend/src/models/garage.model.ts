import {
	Ref,
	prop,
	getModelForClass,
	ModelOptions,
} from '@typegoose/typegoose';
import { User } from './user.model';

export enum VehicleType {
	LINEAL = 'lineal',
	MOTOTAXI = 'mototaxi',
	CARRO = 'carro',
	CAMION = 'camion',
}

@ModelOptions({
	schemaOptions: {
		timestamps: true,
	},
})
export class Garage {
	@prop({
		required: true,
		enum: VehicleType,
	})
	public type!: string; // Tipo de vehiculo [Mototaxi, Moto Lineal, Carro, Camion]

	@prop({
		required: true,
	})
	public paid!: number;

	@prop({
		// required: true,
	})
	public placa!: string;

	@prop({
		required: true,
	})
	public owner!: string;

	@prop({
		required: true,
	})
	public entry!: Date;

	@prop({
		required: true,
	})
	public exit!: Date;

	@prop({
		required: true,
		ref: () => User,
	})
	public receivedBy!: Ref<User>;
}

export const garageModel = getModelForClass(Garage);
