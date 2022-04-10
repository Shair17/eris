import { Service } from 'fastify-decorators';
import { EMAIL_REGEX, USERNAME_REGEX } from '../../constants/regex';
import { DocumentType } from '@typegoose/typegoose';
import { userModel, User } from '../../models/user.model';
import { RegisterDto } from '../auth/auth.dto';

@Service()
export class UserService {
	constructor() {}

	async getUserByEmail(email: string): Promise<DocumentType<User> | null> {
		return userModel.findOne({ email });
	}

	async getUserById(id: string): Promise<DocumentType<User> | null> {
		return userModel.findById(id);
	}

	isEmail(email: string): boolean {
		return EMAIL_REGEX.test(email);
	}
}
