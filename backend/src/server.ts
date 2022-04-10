import 'reflect-metadata';

import Fastify, {
	FastifyServerOptions,
	FastifyInstance,
	FastifyLoggerInstance,
} from 'fastify';
import { Server as IServer, IncomingMessage, ServerResponse } from 'http';
import { resolve } from 'path';
import { StatusCodes } from 'http-status-codes';
import { bootstrap } from 'fastify-decorators';
import { schema } from './config/config.schema';
import {
	AuthController,
	GarageController,
	ProductController,
	SaleController,
	UserController,
} from './controllers/v1';

// https://github.com/L2jLiga/fastify-decorators/

declare module 'fastify' {
	interface FastifyRequest {
		userId: string;
	}

	interface FastifyInstance {
		config: {
			PORT: string;
			MONGODB_URI: string;
			JWT_SECRET: string;
			JWT_REFRESH_SECRET: string;
			JWT_SECRET_EXPIRES_IN: string;
			JWT_REFRESH_SECRET_EXPIRES_IN: string;
		};
	}
}

export default async function Server(
	opts?: FastifyServerOptions
): Promise<
	FastifyInstance<
		IServer,
		IncomingMessage,
		ServerResponse,
		FastifyLoggerInstance
	>
> {
	const server: FastifyInstance = Fastify(opts);

	server.register(require('fastify-env'), {
		dotenv: {
			path: resolve(__dirname, '../.env'),
			// debug: true,
		},
		confKey: 'config',
		schema,
	});

	// server.register(require('fastify-file-upload'));

	server.register(require('fastify-no-icon'));

	server.register(require('fastify-rate-limit'), {
		max: 100,
		timeWindow: '1 minute',
	});

	server.setErrorHandler((error, _, reply) => {
		if (reply.statusCode === StatusCodes.TOO_MANY_REQUESTS) {
			error.message = `¡Llegaste al límite de velocidad! ¡Más despacio, por favor!`;
		}
		reply.send(error);
	});

	server.register(require('fastify-compress'));

	// server.register(require('fastify-routes-stats'));

	// server.get('/__stats', async function (_, reply) {
	// reply.send(this.stats());
	// });

	server.register(bootstrap, {
		controllers: [
			AuthController,
			GarageController,
			ProductController,
			SaleController,
			UserController,
		],
	});

	return server;
}
