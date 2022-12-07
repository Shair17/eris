import {trpc} from '../trpc';
import {z} from 'zod';
import {authProcedure} from '../procedures/auth';
import {adminProcedure} from '../procedures/admin';
import {trimStrings} from '../utils/string';
import {TRPCError} from '@trpc/server';
import {OBJECT_ID_REGEX} from '../constants/regex';

export const storeRouter = trpc.router({
  getStore: authProcedure
    .input(
      z.object({
        storeId: z.string().regex(OBJECT_ID_REGEX, {
          message: 'Invalid Id',
        }),
      }),
    )
    .query(async ({ctx, input}) => {
      const [storeId] = trimStrings(input.storeId);

      const store = await ctx.app.prisma.store.findUnique({
        where: {
          id: storeId,
        },
      });

      if (!store) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Store with id ${storeId} not found.`,
        });
      }

      return store;
    }),
  createMyStore: authProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const [name] = trimStrings(input.name);
      const ownerId = ctx.req.user.id;

      const createdStore = await ctx.app.prisma.store.create({
        data: {
          name,
          owner: {
            connect: {
              id: ownerId,
            },
          },
        },
      });

      return createdStore;
    }),
  deleteMyStore: authProcedure
    .input(
      z.object({
        storeId: z.string().regex(OBJECT_ID_REGEX, {
          message: 'Invalid Id',
        }),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const [storeId] = trimStrings(input.storeId);
      const ownerId = ctx.req.user.id;

      const store = await ctx.app.prisma.store.findUnique({
        where: {
          id: storeId,
        },
      });

      if (!store) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Store with id ${storeId} not found.`,
        });
      }

      if (store.ownerId !== ownerId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: `You can't delete a store that isn't yours.`,
        });
      }

      await ctx.app.prisma.store.delete({
        where: {
          id: store.id,
        },
      });

      return {
        success: true,
        message: `Store ${store.name} was deleted.`,
      };
    }),
  deleteStore: adminProcedure
    .input(
      z.object({
        storeId: z.string().regex(OBJECT_ID_REGEX, {
          message: 'Invalid Id',
        }),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const [storeId] = trimStrings(input.storeId);
      const isAdmin = ctx.req.user.role === 'ADMIN';

      console.log({isAdmin});

      const store = await ctx.app.prisma.store.findUnique({
        where: {
          id: storeId,
        },
      });

      if (!store) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Store with id ${storeId} not found.`,
        });
      }

      await ctx.app.prisma.store.delete({
        where: {
          id: store.id,
        },
      });

      return {
        success: true,
        message: `Store ${store.name} was deleted.`,
      };
    }),
});
