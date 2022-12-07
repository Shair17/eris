import type {FastifyRequest, FastifyReply} from 'fastify';
import {User} from '@prisma/client';

export type Scheme = string;
export type Token = string;

export type BearerToken = [Scheme, Token];

export type Request = FastifyRequest;

export type Reply = FastifyReply;

export type UserPayload = Pick<User, 'id' | 'email' | 'name' | 'role'>;

export type AuthTokenPayload = UserPayload;

export type ForgotPasswordTokenPayload = Pick<User, 'id' | 'email' | 'name'>;

export type Tokens = {
  accessToken: Token;
  refreshToken: Token;
};
