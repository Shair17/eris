import { Service } from 'fastify-decorators';
import { TokenService } from '../../shared/services/token.service';
import { User, userModel } from '../../models/user.model';
import {
	LogoutDto,
	RefreshTokenDto,
	ITokens,
	LoginDto,
	RegisterDto,
} from './auth.dto';
import { Unauthorized, BadRequest } from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../user/user.service';
import { PasswordService } from '../../shared/services/password.service';

@Service()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly passwordService: PasswordService,
		private readonly tokenService: TokenService
	) {}

	async login({ email, password }: LoginDto): Promise<ITokens> {
		email = email.toLowerCase().trim();

		if (!this.userService.isEmail(email)) {
			throw new BadRequest('invalid_credentials');
		}

		const foundUser = await this.userService.getUserByEmail(email);

		if (!foundUser) {
			throw new Unauthorized('invalid_credentials');
		}

		if (!(await this.passwordService.verify(foundUser.password, password))) {
			throw new Unauthorized('invalid_credentials');
		}

		if (foundUser.isBanned) {
			throw new Unauthorized('banned');
		}

		const { accessToken, refreshToken } =
			this.tokenService.generateTokens(foundUser);

		await userModel.findOneAndUpdate(
			{ id: foundUser.id },
			{ refreshToken },
			{ new: true }
		);

		return {
			accessToken,
			refreshToken,
		};
	}

	async register({ fullName, email, password }: RegisterDto): Promise<ITokens> {
		fullName = fullName.trim();
		email = email.toLowerCase().trim();

		if (!this.userService.isEmail(email)) {
			throw new BadRequest('invalid_credentials');
		}

		const foundUser = await this.userService.getUserByEmail(email);

		if (foundUser) {
			throw new BadRequest('invalid_credentials');
		}

		const passwordHashed = await this.passwordService.hash(password);

		const newUser = new userModel({
			fullName,
			email,
			password: passwordHashed,
		});

		const { accessToken, refreshToken } =
			this.tokenService.generateTokens(newUser);

		newUser.refreshToken = refreshToken;
		await newUser.save();

		return {
			accessToken,
			refreshToken,
		};
	}

	async refreshToken({ refreshToken: token }: RefreshTokenDto) {
		const isValidJWT = this.tokenService.isValidJWT(token);

		if (!isValidJWT) {
			throw new BadRequest('invalid_token');
		}

		const { id } = this.tokenService.verifyRefreshToken(token) as {
			id: string;
			email: string;
			iat: number;
			exp: number;
		};

		const user = await this.userService.getUserById(id);

		if (!user) {
			throw new BadRequest();
		}

		const accessToken = this.tokenService.generateAccessToken({
			id: user.id,
			email: user.email,
		});

		return {
			accessToken,
			refreshToken: token,
		};
	}

	async logout({ refreshToken }: LogoutDto) {
		const isValidJWT = this.tokenService.isValidJWT(refreshToken);

		if (!isValidJWT) {
			throw new Unauthorized();
		}

		const { id } = this.tokenService.verifyRefreshToken(refreshToken) as {
			id: string;
			email: string;
		};

		await userModel.findOneAndUpdate(
			{ id },
			{ refreshToken: null },
			{ new: true }
		);

		return {
			statusCode: StatusCodes.OK,
			success: true,
			message: 'Log out success',
		};
	}
}
