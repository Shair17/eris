import { Controller, POST as Post } from 'fastify-decorators';
import { AuthService } from './auth.service';
import { hasBearerToken, isUserAuthenticated } from '../../hooks/auth.hooks';
import {
	LogoutSchema,
	LoginSchema,
	RefreshTokenSchema,
	RegisterSchema,
} from './auth.schema';
import { Request, Reply } from 'interfaces/http.interfaces';
import {
	LogoutDto,
	LoginDto,
	ITokens,
	RefreshTokenDto,
	RegisterDto,
} from './auth.dto';

@Controller('/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/login', {
		schema: LoginSchema,
	})
	async login(
		request: Request<{ Body: LoginDto }>,
		reply: Reply
	): Promise<ITokens> {
		const { email, password } = request.body;

		return this.authService.login({ email, password });
	}

	// @Post('/register', {
	// 	schema: RegisterSchema,
	// })
	// async register(request: Request<{ Body: RegisterDto }>, reply: Reply) {
	// 	const { fullName, email, password } = request.body;

	// 	return this.authService.register({ fullName, email, password });
	// }

	@Post('/refresh', {
		schema: RefreshTokenSchema,
	})
	async refresh(request: Request<{ Body: RefreshTokenDto }>, reply: Reply) {
		const { refreshToken } = request.body;

		return this.authService.refreshToken({ refreshToken });
	}

	@Post('/logout', {
		schema: LogoutSchema,
		preHandler: [hasBearerToken, isUserAuthenticated],
	})
	async logout(request: Request<{ Body: LogoutDto }>, reply: Reply) {
		const { refreshToken } = request.body;

		return this.authService.logout({ refreshToken });
	}
}
