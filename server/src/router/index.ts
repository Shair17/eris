import {trpc} from '../trpc';
import {garageRecordRouter} from './garage-record.route';
import {garageRouter} from './garage.route';
import {productRouter} from './product.route';
import {saleRouter} from './sale.route';
import {storeRouter} from './store.route';
import {userRouter} from './user.route';
import {authRoute} from './auth.route';
import {vehicleRouter} from './vehicle.route';
import {roleRouter} from './role.route';

export const appRouter = trpc.mergeRouters(
  garageRecordRouter,
  garageRouter,
  productRouter,
  saleRouter,
  storeRouter,
  userRouter,
  authRoute,
  roleRouter,
  vehicleRouter,
);

export type AppRouter = typeof appRouter;
