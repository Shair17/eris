import {trpc} from '../trpc';
import {publicProcedure} from '../procedures/public';
import {Role} from '@prisma/client';
import {upperFirstLetter} from '../utils/string';

export const roleRouter = trpc.router({
  getRoles: publicProcedure.query(() =>
    Object.keys(Role).map(role => upperFirstLetter(role.toLowerCase())),
  ),
});
