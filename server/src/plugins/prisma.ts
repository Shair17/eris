import {FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import {PrismaClient} from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (server, _) => {
  const prisma = new PrismaClient({
    log:
      server.config.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
    // log: ['error', 'warn', 'info', 'query'],
  });

  // const startTime = Date.now();
  await prisma.$connect();
  // const durationMs = Date.now() - startTime;

  server.log.info(`Prisma has established the connection to the database.`);

  server.decorate('prisma', prisma);

  server.addHook('onClose', async server => {
    await server.prisma.$disconnect();

    server.log.info(`Prisma has been disconnected from the database.`);
  });
});

export default prismaPlugin;
