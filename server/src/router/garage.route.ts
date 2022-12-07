import {trpc} from '../trpc';
import {z} from 'zod';
import {authProcedure} from '../procedures/auth';
import {TRPCError} from '@trpc/server';
import {adminProcedure} from '../procedures/admin';
import {OBJECT_ID_REGEX} from '../constants/regex';

export const garageRouter = trpc.router({
  getMyGarages: authProcedure
    .input(
      z.object({
        take: z.number().default(10),
        skip: z.number().default(0),
      }),
    )
    .query(async ({ctx, input}) => {
      const userId = ctx.req.user.id;

      const garages = await ctx.app.prisma.garage.findMany({
        where: {
          owner: {
            id: userId,
          },
        },
        take: input.take,
        skip: input.skip,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        success: true,
        garages,
      };
    }),

  editMyGarage: authProcedure
    .input(
      z.object({
        garageId: z.string().regex(OBJECT_ID_REGEX),
        name: z.string().trim(),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const garageId = input.garageId;
      const name = input.name;
      const userId = ctx.req.user.id;

      const user = await ctx.app.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      const garage = await ctx.app.prisma.garage.findUnique({
        where: {
          id: garageId,
        },
      });

      if (!garage) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Garage not found',
        });
      }

      if (garage.userId !== user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      const updatedGarage = await ctx.app.prisma.garage.update({
        where: {
          id: garage.id,
        },
        data: {
          name,
        },
      });

      return {
        garage: updatedGarage,
        success: true,
      };
    }),

  createGarage: authProcedure
    .input(
      z.object({
        name: z.string().trim(),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const userId = ctx.req.user.id;

      const user = await ctx.app.prisma.user.findUnique({where: {id: userId}});

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      const name = input.name;

      const garageExists = await ctx.app.prisma.garage.findFirst({
        where: {name, userId: user.id},
      });

      if (garageExists) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Choose another name for your garage',
        });
      }

      const garage = await ctx.app.prisma.garage.create({
        data: {
          name,
          owner: {
            connect: {
              id: user.id,
            },
          },
        },
        select: {
          id: true,
          name: true,
        },
      });

      return {
        garage,
        success: true,
      };
    }),

  deleteMyGarage: authProcedure
    .input(
      z.object({
        garageId: z.string().regex(OBJECT_ID_REGEX),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const garageId = input.garageId;
      const userId = ctx.req.user.id;

      const user = await ctx.app.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      const garage = await ctx.app.prisma.garage.findUnique({
        where: {
          id: garageId,
        },
      });

      if (!garage) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Garage not found',
        });
      }

      if (garage.userId !== user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      await ctx.app.prisma.garage.delete({
        where: {
          id: garage.id,
        },
      });

      return {
        success: true,
      };
    }),

  // Only for admins
  // they can delete any garage form any user
  deleteGarage: adminProcedure
    .input(
      z.object({
        garageId: z.string().regex(OBJECT_ID_REGEX),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const garageId = input.garageId;

      await ctx.app.prisma.garage.delete({
        where: {
          id: garageId,
        },
      });

      return {
        success: true,
      };
    }),
});
