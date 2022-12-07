import {FastifyBaseLogger, FastifyServerOptions} from 'fastify';
import {IncomingMessage, ServerResponse} from 'http';
import * as pkg from '../../package.json';
import {Server as IServer} from 'http';

type AppRecord = Record<string, string>;

interface Server {
  name: string;
  host: string;
  version: string;
  config: FastifyServerOptions<
    IServer<typeof IncomingMessage, typeof ServerResponse>,
    FastifyBaseLogger
  >;
}

export const server: Server = {
  name: 'Eris',
  host: '0.0.0.0',
  version: pkg.version,
  config: {
    maxParamLength: 5000,
    logger: true,
    disableRequestLogging: true,
  },
};

export const developer = {
  name: 'Shair17',
  email: 'hello@shair.dev',
  website: 'https://shair.dev',
};
