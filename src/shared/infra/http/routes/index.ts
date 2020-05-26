import { Router } from 'express';

import transactionsRouter from '@modules/transactions/infra/http/routes/transactions.routes';
import categorysRouter from '@modules/categorys/infra/http/routes/categorys.routes';
import usersRouter from '@modules/users/infra/http/routes/users.route';
import sessionRouter from '@modules/users/infra/http/routes/session.route';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const routes = Router();

routes.use('/categorys', categorysRouter);
routes.use('/transactions', ensureAuthenticated, transactionsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);

export default routes;
