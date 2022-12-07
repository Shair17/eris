import {trpc} from '../trpc';
import {z} from 'zod';
import {Vehicle} from '@prisma/client';
import {authProcedure} from '../procedures/auth';
import {OBJECT_ID_REGEX} from '../constants/regex';
import {TRPCError} from '@trpc/server';

export const garageRecordRouter = trpc.router({
  createGarageRecord: authProcedure
    .input(
      z.object({
        garageId: z.string().regex(OBJECT_ID_REGEX),
        note: z.optional(z.string().trim()),
        amountPaid: z.number().default(0),
        departureDate: z.optional(z.date()),
        vehicle: z.nativeEnum(Vehicle),
        vehicleOwner: z.string().trim(),
        vehicleShield: z.optional(z.string().trim()),
        vehiclePhoto: z.optional(z.string()),
        vehicleDescription: z.optional(z.string()),
      }),
    )
    .mutation(async ({ctx, input}) => {
      const userId = ctx.req.user.id;

      const user = await ctx.app.prisma.user.findUnique({
        where: {id: userId},
        select: {id: true},
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      const garage = await ctx.app.prisma.garage.findUnique({
        where: {id: input.garageId},
        select: {id: true},
      });

      if (!garage) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
        });
      }

      const garageRecord = await ctx.app.prisma.garageRecord.create({
        data: {
          amountPaid: input.amountPaid,
          vehicle: input.vehicle,
          vehicleOwner: input.vehicleOwner,
          vehicleDescription: input.vehicleDescription,
          vehiclePhoto: input.vehiclePhoto,
          vehicleShield: input.vehicleShield,
          departureDate: input.departureDate,
          garage: {
            connect: {
              id: garage.id,
            },
          },
          receivedBy: {
            connect: {
              id: user.id,
            },
          },
          note: input.note,
        },
      });

      return {
        garageRecord,
        success: true,
      };
    }),
});
