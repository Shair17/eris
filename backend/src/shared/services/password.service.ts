import { Service } from 'fastify-decorators';
import * as argon2 from 'argon2';

@Service()
export class PasswordService {
	async hash(password: string): Promise<string> {
		try {
			return await argon2.hash(password);
		} catch (error) {
			throw error;
		}
	}

	async verify(
		hash: string,
		password: string | Buffer,
		options?: argon2.Options
	): Promise<boolean> {
		try {
			return await argon2.verify(hash, password, options);
		} catch (error) {
			throw error;
		}
	}
}
