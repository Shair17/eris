import {trpc} from '../trpc';
import {z} from 'zod';
import {authProcedure} from '../procedures/auth';
import {publicProcedure} from '../procedures/public';
import {adminProcedure} from '../procedures/admin';
import {Role} from '@prisma/client';
import {PASSWORD_REGEX} from '../constants/regex';
import {TRPCError} from '@trpc/server';
import {passwordService} from '../shared/services/password.service';

export const userRouter = trpc.router({
  getMyProfile: authProcedure.query(async ({ctx}) => {
    const id = ctx.req.user.id;

    const user = await ctx.app.prisma.user.findUnique({where: {id}});

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }

    return user;
  }),
  createUser: adminProcedure
    .input(
      z.object({
        name: z.string().trim(),
        email: z.string().email().trim(),
        password: z.string().regex(PASSWORD_REGEX),
        avatar: z.optional(z.string()),
        isActive: z.boolean(),
        role: z.nativeEnum(Role),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const {email, name} = input;

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

      const newUser = await ctx.app.prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          avatar: '',
          isActive: input.isActive,
          role: input.role,
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
        user: newUser,
      };
    }),
  getUsers: adminProcedure
    .input(
      z.object({
        take: z.number().default(10),
        skip: z.number().default(0),
      }),
    )
    .query(async ({ctx, input}) => {
      const users = await ctx.app.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          role: true,
          createdAt: true,
        },
        skip: input.skip,
        take: input.take,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return users;
    }),
});
