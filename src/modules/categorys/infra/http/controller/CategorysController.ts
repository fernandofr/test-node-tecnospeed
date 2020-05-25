import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/categorys/services/CreateCategoryService';
import ReadCategoryService from '@modules/categorys/services/ReadCategoryService';

export default class CategoryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const readTransaction = container.resolve(ReadCategoryService);

    const categorys = await readTransaction.execute();

    return response.json(categorys);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({ title });

    return response.json(category);
  }
}
