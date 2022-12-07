import {publicProcedure} from './public';
import {authMiddleware} from '../middlewares/auth';

export const authProcedure = publicProcedure.use(authMiddleware);
