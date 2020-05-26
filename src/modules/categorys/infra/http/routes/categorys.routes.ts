import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CategorysController from '../controller/CategorysController';

const categorysRouter = Router();
const categorysController = new CategorysController();

categorysRouter.get('/', categorysController.index);
categorysRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
    },
  }),
  categorysController.create,
);

export default categorysRouter;
