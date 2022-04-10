import { Controller, GET as Get, POST as Post } from 'fastify-decorators';
import { UserService } from './user.service';
import { RegisterSchema } from '../auth/auth.schema';
import {
	hasBearerToken,
	isUserAuthenticated,
	isUserAdmin,
} from '../../hooks/auth.hooks';
import { Request, Reply } from '../../interfaces/http.interfaces';
import { RegisterDto } from '../auth/auth.dto';
import { AuthService } from '../auth/auth.service';

@Controller('/users')
export class UserController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService
	) {}

	@Post('/create', {
		schema: RegisterSchema,
		preHandler: [hasBearerToken, isUserAuthenticated, isUserAdmin],
	})
	async create(request: Request<{ Body: RegisterDto }>, reply: Reply) {
		const { fullName, email, password } = request.body;

		return this.authService.register({ fullName, email, password });
	}
}
