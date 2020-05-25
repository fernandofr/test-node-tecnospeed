import { Router } from 'express';
import TransactionsController from '../controllers/TransactionsController';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();

transactionsRouter.get('/', transactionsController.index);
transactionsRouter.post('/', transactionsController.create);
transactionsRouter.delete('/:id', transactionsController.delete);

export default transactionsRouter;
