import { FastifySchema } from 'fastify';
import { JSONSchemaType } from 'ajv';
import { AddGarageDto } from './garage.dto';

export const AddGarageSchema: FastifySchema & {
	body: JSONSchemaType<AddGarageDto>;
} = {
	body: {
		type: 'object',
		properties: {
			type: {
				type: 'string',
			},
			paid: {
				type: 'number',
			},
			placa: {
				type: 'string',
			},
			owner: {
				type: 'string',
			},
			entry: {
				type: 'string',
				format: 'date-time',
			},
			exit: {
				type: 'string',
				format: 'date-time',
			},
			receivedBy: {
				type: 'string',
			},
		},
		required: ['type', 'paid', 'placa', 'owner', 'entry', 'exit', 'receivedBy'],
		additionalProperties: false,
	},
};
