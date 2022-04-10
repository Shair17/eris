import { onRequestHookHandler } from 'fastify';
import * as jwt from 'jsonwebtoken';
import { BadRequest, Unauthorized, InternalServerError } from 'http-errors';

import { userModel } from '../models/user.model';

export const hasBearerToken: onRequestHookHandler = (request, _, done) => {
	let token: string;

	if (request.headers && request.headers.authorization) {
		// Separando Bearer & `token`
		const parts = request.headers.authorization.split(' ');

		// Validando que `parts` solo tenga dos strings
		if (parts.length === 2 && parts[1].split('.').length === 3) {
			// Bearer scheme
			const scheme = parts[0];
			// recuperamos el token de parts
			token = parts[1];

			// Si no es un token de tipo Bearer, get out!
			if (!/^Bearer$/i.test(scheme)) {
				return done(new BadRequest(`malformed_token`));
			}
		} else {
			return done(new BadRequest(`malformed_token`));
		}
	} else {
		return done(new Unauthorized(`token_not_provided`));
	}

	const decoded = jwt.decode(token) as jwt.JwtPayload;

	if (!decoded) {
		return done(new BadRequest(`malformed_token`));
	}

	if (Date.now() >= decoded.exp! * 1000) {
		return done(new BadRequest('token_expired'));
	}

	done();
};

export const isUserAuthenticated: onRequestHookHandler = async (request, _) => {
	try {
		const token = request.headers.authorization?.split(' ')[1];

		const { id } = jwt.verify(token!, process.env.JWT_SECRET!) as {
			id: string;
			email: string;
			username: string;
			iat: number;
			exp: number;
		};

		const user = await userModel.findById(id);

		if (!user) {
			throw new Unauthorized();
		}

		if (!user.refreshToken) {
			throw new Unauthorized();
		}

		if (user.isBanned) {
			console.log('baneado');
			throw new Unauthorized('banned');
		}

		request.userId = user.id;
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			throw new Unauthorized(`token_expired`);
		}

		if (error instanceof jwt.JsonWebTokenError) {
			throw new Unauthorized(`invalid_token`);
		}

		if (error instanceof Unauthorized) {
			throw new Unauthorized();
		}

		throw new InternalServerError();
	}
};

export const isUserAdmin: onRequestHookHandler = async (request, _) => {
	try {
		const id = request.userId;

		const user = await userModel.findById(id);

		if (!user) {
			throw new Unauthorized();
		}

		if (!user.isAdmin) {
			throw new Unauthorized();
		}
	} catch (error) {
		if (error instanceof Unauthorized) {
			throw new Unauthorized('not_admin');
		}

		throw new InternalServerError();
	}
};
