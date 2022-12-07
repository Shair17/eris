import {TRPCError} from '@trpc/server';
import {jwtService, JsonWebTokenError, TokenExpiredError} from './jwt.service';
import {
  ForgotPasswordTokenPayload,
  AuthTokenPayload,
  Tokens,
  Token,
} from '../../types';

class TokenService {
  private readonly jwtService = jwtService;

  generateForgotPasswordToken({
    payload,
    secret,
    expiresIn,
  }: {
    payload: ForgotPasswordTokenPayload;
    secret: string;
    expiresIn: string;
  }): Token {
    return this.jwtService.sign(payload, secret, {
      expiresIn,
    });
  }

  verifyAccessToken({
    accessToken,
    secret,
  }: {
    accessToken: Token;
    secret: string;
  }): AuthTokenPayload {
    try {
      return <AuthTokenPayload>this.jwtService.verify(accessToken, secret);
    } catch (error) {
      console.log(error);
      if (error instanceof TokenExpiredError) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Token Expired',
        });
      }

      if (error instanceof JsonWebTokenError) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid Token',
        });
      }

      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }
  }

  verifyRefreshToken({
    refreshToken,
    secret,
  }: {
    refreshToken: Token;
    secret: string;
  }): AuthTokenPayload {
    try {
      return <AuthTokenPayload>this.jwtService.verify(refreshToken, secret);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Token Expired',
        });
      }

      if (error instanceof JsonWebTokenError) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid Token',
        });
      }

      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }
  }

  verifyForgotPasswordToken({
    resetPasswordToken,
    secret,
  }: {
    resetPasswordToken: Token;
    secret: string;
  }): ForgotPasswordTokenPayload {
    try {
      return <ForgotPasswordTokenPayload>(
        this.jwtService.verify(resetPasswordToken, secret)
      );
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Token Expired',
        });
      }

      if (error instanceof JsonWebTokenError) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid Token',
        });
      }

      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }
  }

  generateAccessToken({
    payload,
    secret,
    expiresIn,
  }: {
    payload: AuthTokenPayload;
    secret: string;
    expiresIn: string;
  }): Token {
    return this.jwtService.sign(payload, secret, {
      expiresIn,
    });
  }

  generateRefreshToken({
    payload,
    secret,
    expiresIn,
  }: {
    payload: AuthTokenPayload;
    secret: string;
    expiresIn: string;
  }): Token {
    return this.jwtService.sign(payload, secret, {
      expiresIn,
    });
  }

  generateTokens({
    payload,
    accessToken,
    refreshToken,
  }: {
    payload: AuthTokenPayload;
    accessToken: {
      secret: string;
      expiresIn: string;
    };
    refreshToken: {
      secret: string;
      expiresIn: string;
    };
  }): Tokens {
    return {
      accessToken: this.generateAccessToken({
        payload,
        expiresIn: accessToken.expiresIn,
        secret: accessToken.secret,
      }),
      refreshToken: this.generateRefreshToken({
        payload,
        expiresIn: refreshToken.expiresIn,
        secret: refreshToken.secret,
      }),
    };
  }
}

export const tokenService = new TokenService();
