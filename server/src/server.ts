import fastify from 'fastify';
import {
  fastifyTRPCPlugin,
  CreateFastifyContextOptions,
} from '@trpc/server/adapters/fastify';
import fastifyEnv from '@fastify/env';
import fastifyCompress from '@fastify/compress';
import fastifyHelmet from '@fastify/helmet';
import shutdownPlugin from './plugins/shutdown';
import {ConfigSchema, ConfigSchemaType} from './config/config.schema';
import prismaPlugin from './plugins/prisma';
import cloudinaryPlugin from './plugins/cloudinary';
import noIconPlugin from './plugins/no-icon';
import {appRouter} from './router';
import {Context} from './context';
import {UserPayload} from './types';
import {server as serverConstants} from './constants/app';

declare module 'fastify' {
  interface FastifyInstance {
    config: ConfigSchemaType;
  }

  interface FastifyRequest {
    user: UserPayload | null;
  }
}

const server = fastify(serverConstants.config);

server.register(fastifyEnv, {
  dotenv: true,
  confKey: 'config',
  schema: ConfigSchema,
});
server.register(fastifyCompress);
server.register(fastifyHelmet, {
  global: true,
  hidePoweredBy: true,
});
server.register(noIconPlugin);
server.register(prismaPlugin);
server.register(cloudinaryPlugin);
server.decorateRequest('user', null);
server.register(fastifyTRPCPlugin, {
  prefix: '/api',
  trpcOptions: {
    router: appRouter,
    createContext: ({req, res}: CreateFastifyContextOptions): Context => ({
      req,
      res,
      app: server,
    }),
  },
});
server.register(shutdownPlugin);

export default server;
