import {authProcedure} from './auth';
import {adminMiddleware} from '../middlewares/admin';

export const adminProcedure = authProcedure.use(adminMiddleware);
