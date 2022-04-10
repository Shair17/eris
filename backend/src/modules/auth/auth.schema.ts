import { JSONSchemaType } from 'ajv';
import { FastifySchema } from 'fastify';
import { LogoutDto, LoginDto, RefreshTokenDto, RegisterDto } from './auth.dto';

export const RefreshTokenSchema: FastifySchema & {
	body: JSONSchemaType<RefreshTokenDto>;
} = {
	body: {
		type: 'object',
		properties: {
			refreshToken: {
				type: 'string',
			},
		},
		required: ['refreshToken'],
		additionalProperties: false,
	},
};

export const RegisterSchema: FastifySchema & {
	body: JSONSchemaType<RegisterDto>;
} = {
	body: {
		type: 'object',
		properties: {
			fullName: {
				type: 'string',
			},
			email: {
				type: 'string',
				format: 'email',
			},
			password: {
				type: 'string',
			},
		},
		required: ['fullName', 'email', 'password'],
		additionalProperties: false,
	},
};

export const LoginSchema: FastifySchema & {
	body: JSONSchemaType<LoginDto>;
} = {
	body: {
		type: 'object',
		properties: {
			email: {
				type: 'string',
				format: 'email',
			},
			password: {
				type: 'string',
			},
		},
		required: ['email', 'password'],
		additionalProperties: false,
	},
};

export const LogoutSchema: FastifySchema & {
	body: JSONSchemaType<LogoutDto>;
} = {
	body: {
		type: 'object',
		properties: {
			refreshToken: {
				type: 'string',
			},
		},
		required: ['refreshToken'],
		additionalProperties: false,
	},
};
