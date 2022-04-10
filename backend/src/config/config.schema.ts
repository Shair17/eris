import { JSONSchemaType } from 'ajv';

export interface IConfigSchema {
	PORT: string;
	MONGODB_URI: string;
	JWT_SECRET: string;
	JWT_REFRESH_SECRET: string;
	JWT_SECRET_EXPIRES_IN: string;
	JWT_REFRESH_SECRET_EXPIRES_IN: string;
}

export const schema: JSONSchemaType<IConfigSchema> = {
	type: 'object',
	required: [
		'PORT',
		'MONGODB_URI',
		'JWT_SECRET',
		'JWT_REFRESH_SECRET',
		'JWT_SECRET_EXPIRES_IN',
		'JWT_REFRESH_SECRET_EXPIRES_IN',
	],
	properties: {
		PORT: {
			type: 'string',
		},
		MONGODB_URI: {
			type: 'string',
		},
		JWT_SECRET: {
			type: 'string',
		},
		JWT_REFRESH_SECRET: {
			type: 'string',
		},
		JWT_SECRET_EXPIRES_IN: {
			type: 'string',
		},
		JWT_REFRESH_SECRET_EXPIRES_IN: {
			type: 'string',
		},
	},
};
