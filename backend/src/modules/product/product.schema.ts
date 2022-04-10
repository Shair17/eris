import { FastifySchema } from 'fastify';
import { JSONSchemaType } from 'ajv';
import {
	CreateProductDto,
	GetProductsDto,
	GetProductByIdDto,
} from './product.dto';

export const CreateProductSchema: FastifySchema & {
	body: JSONSchemaType<CreateProductDto>;
} = {
	body: {
		type: 'object',
		properties: {
			name: {
				type: 'string',
			},
			price: {
				type: 'number',
			},
			stock: {
				type: 'number',
			},
			image: {
				type: 'string',
			},
		},
		required: ['name', 'price', 'stock', 'image'],
		additionalProperties: false,
	},
};

export const GetProductByIdSchema: FastifySchema & {
	params: JSONSchemaType<GetProductByIdDto>;
} = {
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
			},
		},
		required: ['id'],
		additionalProperties: false,
	},
};

export const GetProductsSchema: FastifySchema & {
	body: JSONSchemaType<GetProductsDto>;
} = {
	body: {
		type: 'object',
		properties: {},
		required: [],
		additionalProperties: false,
	},
};
