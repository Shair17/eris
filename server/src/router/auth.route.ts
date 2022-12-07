import {trpc} from '../trpc';
import {TRPCError} from '@trpc/server';
import {z} from 'zod';
import {PASSWORD_REGEX, JWT_REGEX} from '../constants/regex';
import {trimStrings} from '../utils/string';
import {tokenService} from '../shared/services/token.service';
import {passwordService} from '../shared/services/password.service';
import {authProcedure} from '../procedures/auth';
import {publicProcedure} from '../procedures/public';

export const authRoute = trpc.router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email().trim(),
        password: z.string().regex(PASSWORD_REGEX),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const [email] = trimStrings(input.email);

      const user = await ctx.app.prisma.user.findUnique({
        where: {email},
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          password: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid Credentials',
        });
      }

      if (!passwordService.isValidPassword(input.password)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid Credentials',
        });
      }

      if (!(await passwordService.verify(user.password, input.password))) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid Credentials',
        });
      }

      const tokens = tokenService.generateTokens({
        payload: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken: {
          expiresIn: ctx.app.config.JWT_SECRET_EXPIRES_IN,
          secret: ctx.app.config.JWT_SECRET,
        },
        refreshToken: {
          expiresIn: ctx.app.config.JWT_REFRESH_SECRET_EXPIRES_IN,
          secret: ctx.app.config.JWT_REFRESH_SECRET,
        },
      });

      const updatedUser = await ctx.app.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken: tokens.refreshToken,
        },
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          role: true,
        },
      });

      return {
        user: updatedUser,
        tokens,
      };
    }),
  register: publicProcedure
    .input(
      z.object({
        name: z.string().trim(),
        email: z.string().email().trim(),
        password: z.string().regex(PASSWORD_REGEX),
        avatar: z.optional(z.string()),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const [email, name] = trimStrings(input.email, input.name);

      const foundUser = await ctx.app.prisma.user.findUnique({
        where: {email},
      });

      if (foundUser) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Try with another data.',
        });
      }

      // ? Here upload avatar to cloudinary or in server or something like

      const hashedPassword = await passwordService.hash(input.password);

      const usersCount = await ctx.app.prisma.user.count();

      const newUser = await ctx.app.prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          avatar: '',
          isActive: usersCount === 0,
          role: usersCount === 0 ? 'ADMIN' : 'USER',
        },
      });

      const tokens = tokenService.generateTokens({
        payload: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        accessToken: {
          expiresIn: ctx.app.config.JWT_SECRET_EXPIRES_IN,
          secret: ctx.app.config.JWT_SECRET,
        },
        refreshToken: {
          expiresIn: ctx.app.config.JWT_REFRESH_SECRET_EXPIRES_IN,
          secret: ctx.app.config.JWT_REFRESH_SECRET,
        },
      });

      const updatedUser = await ctx.app.prisma.user.update({
        where: {
          id: newUser.id,
        },
        data: {
          refreshToken: tokens.refreshToken,
        },
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          role: true,
        },
      });

      return {
        user: updatedUser,
        tokens,
      };
    }),
  refresh: authProcedure
    .input(
      z.object({
        refreshToken: z.string().regex(JWT_REGEX),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const decoded = tokenService.verifyRefreshToken({
        refreshToken: input.refreshToken,
        secret: ctx.app.config.JWT_REFRESH_SECRET,
      });

      const user = await ctx.app.prisma.user.findUnique({
        where: {id: decoded.id},
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      const accessToken = tokenService.generateAccessToken({
        payload: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        expiresIn: ctx.app.config.JWT_SECRET_EXPIRES_IN,
        secret: ctx.app.config.JWT_SECRET,
      });

      return {
        accessToken,
        refreshToken: input.refreshToken,
      };
    }),
  logout: authProcedure.mutation(async ({ctx}) => {
    ctx.res.removeHeader('authorization');

    await ctx.app.prisma.user.update({
      where: {
        id: ctx.req.user.id,
      },
      data: {
        refreshToken: null,
      },
    });

    return {
      success: true,
    };
  }),
});
