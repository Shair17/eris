import { FastifyInstance } from 'fastify';
import {
	Service,
	getInstanceByToken,
	FastifyInstanceToken,
} from 'fastify-decorators';
import * as jwt from 'jsonwebtoken';
import { DocumentType } from '@typegoose/typegoose';
import { User } from '../../models/user.model';

@Service()
export class TokenService {
	private readonly fastify =
		getInstanceByToken<FastifyInstance>(FastifyInstanceToken);

	private readonly jwtSecret = this.fastify.config.JWT_SECRET;
	private readonly jwtSecretExpiresIn =
		this.fastify.config.JWT_SECRET_EXPIRES_IN;

	private readonly jwtRefreshSecret = this.fastify.config.JWT_REFRESH_SECRET;
	private readonly jwtRefreshSecretExpiresIn =
		this.fastify.config.JWT_REFRESH_SECRET_EXPIRES_IN;

	constructor() {}

	public isValidJWT(token: string): boolean {
		const parts = token.split('.');

		if (parts.length !== 3) {
			return false;
		}

		const decoded = jwt.decode(token) as jwt.JwtPayload;

		if (!decoded) {
			return false;
		}

		if (Date.now() >= decoded.exp! * 1000) {
			return false;
		}

		return true;
	}

	public generateTokens(user: DocumentType<User>) {
		const {
			jwtSecret,
			jwtSecretExpiresIn,
			jwtRefreshSecret,
			jwtRefreshSecretExpiresIn,
		} = this;
		const { id, email } = user;

		return {
			accessToken: this.generateAccessToken(
				{ id, email },
				jwtSecret,
				jwtSecretExpiresIn
			),
			refreshToken: this.generateRefreshToken(
				{ id, email },
				jwtRefreshSecret,
				jwtRefreshSecretExpiresIn
			),
		};
	}

	public verifyRefreshToken(token: string) {
		return jwt.verify(token, this.jwtRefreshSecret);
	}

	public generateAccessToken(
		{ id, email }: { id: string; email: string },
		secret: string = this.jwtSecret,
		expiresIn: string = this.jwtSecretExpiresIn
	) {
		return jwt.sign(
			{
				id,
				email,
			},
			secret,
			{
				expiresIn,
			}
		);
	}

	private generateRefreshToken(
		{ id, email }: { id: string; email: string },
		secret: string,
		expiresIn: string
	) {
		return jwt.sign(
			{
				id,
				email,
			},
			secret,
			{
				expiresIn,
			}
		);
	}
}
