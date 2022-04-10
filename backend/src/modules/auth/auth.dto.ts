export interface LoginDto {
	email: string;
	password: string;
}

export interface RegisterDto extends LoginDto {
	fullName: string;
}

export interface ITokens {
	accessToken: string;
	refreshToken: string;
}

export interface RefreshTokenDto {
	refreshToken: string;
}

export interface LogoutDto extends RefreshTokenDto {}
