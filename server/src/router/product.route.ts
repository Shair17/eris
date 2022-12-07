import {trpc} from '../trpc';
import {z} from 'zod';
import {authProcedure} from '../procedures/auth';
import {OBJECT_ID_REGEX} from '../constants/regex';
import {SotckType} from '@prisma/client';
import {TRPCError} from '@trpc/server';

export const productRouter = trpc.router({
  createProduct: authProcedure
    .input(
      z.object({
        name: z.string().trim(),
        description: z.optional(z.string().trim()),
        blurHash: z.string(),
        note: z.optional(z.string().trim()),
        price: z.number(),
        image: z.string(),
        available: z.boolean(),

        stock: z.number(),
        stockType: z.nativeEnum(SotckType),

        storeId: z.string().regex(OBJECT_ID_REGEX),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const storeId = input.storeId;

      const store = await ctx.app.prisma.store.findUnique({
        where: {id: storeId},
      });

      if (!store) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Store with id ${storeId} doesn't exists.`,
        });
      }

      const product = await ctx.app.prisma.product.create({
        data: {
          name: input.name,
          image: input.image,
          blurHash: input.blurHash,
          stock: input.stock,
          stockType: input.stockType,
          description: input.description,
          available: input.available,
          note: input.note,
          price: input.price,
          store: {
            connect: {
              id: store.id,
            },
          },
        },
      });

      return {
        product,
        success: true,
      };
    }),
});
