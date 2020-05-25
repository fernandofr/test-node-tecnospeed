import { Router } from 'express';
import CategorysController from '../controller/CategorysController';

const categorysRouter = Router();
const categorysController = new CategorysController();

categorysRouter.get('/', categorysController.index);
categorysRouter.post('/', categorysController.create);

export default categorysRouter;
