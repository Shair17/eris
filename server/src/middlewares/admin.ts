import {trpc} from '../trpc';
import {TRPCError} from '@trpc/server';

export const adminMiddleware = trpc.middleware(async ({ctx, next}) => {
  if (!ctx.req.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }

  if (ctx.req.user.role !== 'ADMIN') {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: `Admins only`,
    });
  }

  return next({
    ctx: {
      ...ctx,
      req: {
        ...ctx.req,
        user: ctx.req.user,
      },
    },
  });
});
