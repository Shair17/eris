import {trpc} from '../trpc';
import {z} from 'zod';
import {authProcedure} from '../procedures/auth';
import {OBJECT_ID_REGEX} from '../constants/regex';
import {TRPCError} from '@trpc/server';

export const saleRouter = trpc.router({
  createSale: authProcedure
    .input(
      z.object({
        note: z.optional(z.string()),
        payout: z.number(),
        soldTo: z.string().trim(),
        storeId: z.string().regex(OBJECT_ID_REGEX),
        products: z.array(z.string().regex(OBJECT_ID_REGEX)),
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

      const store = await ctx.app.prisma.store.findUnique({
        where: {id: input.storeId},
      });

      if (!store) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
        });
      }

      for (const productId of input.products) {
        const product = await ctx.app.prisma.product.findUnique({
          where: {
            id: productId,
          },
          select: {
            id: true,
          },
        });

        if (!product) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Product with id ${productId} doesn't exists.`,
          });
        }
      }

      const productsToConnect = input.products.map(productId => ({
        id: productId,
      }));

      const sale = await ctx.app.prisma.sale.create({
        data: {
          payout: input.payout,
          soldTo: input.soldTo,
          note: input.note,
          store: {
            connect: {
              id: store.id,
            },
          },
          soldBy: {
            connect: {
              id: user.id,
            },
          },
          products: {
            connect: productsToConnect,
          },
        },
      });

      return {
        success: true,
        sale,
      };
    }),
});
