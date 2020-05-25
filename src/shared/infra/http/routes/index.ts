import { Router } from 'express';

import transactionsRouter from '@modules/transactions/infra/http/routes/transactions.routes';
import categorysRouter from '@modules/categorys/infra/http/routes/categorys.routes';

const routes = Router();

routes.use('/categorys', categorysRouter);
routes.use('/transactions', transactionsRouter);

export default routes;
