import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import TransactionsController from '../controllers/TransactionsController';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();

transactionsRouter.get('/', transactionsController.index);
transactionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      value: Joi.number().required(),
      type: Joi.string().valid('entrada', 'saida').required(),
      category: Joi.string().required(),
    },
  }),
  transactionsController.create,
);
transactionsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  transactionsController.delete,
);

export default transactionsRouter;
