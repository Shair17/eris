import {trpc} from '../trpc';
import {publicProcedure} from '../procedures/public';
import {Vehicle} from '@prisma/client';
import {upperFirstLetter} from '../utils/string';
import {authProcedure} from '../procedures/auth';

export const vehicleRouter = trpc.router({
  getVehicles: publicProcedure.query(() =>
    Object.keys(Vehicle).map(vehicle =>
      upperFirstLetter(vehicle.toLowerCase()),
    ),
  ),
});
