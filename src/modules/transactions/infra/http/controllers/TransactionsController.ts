import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/categorys/services/CreateCategoryService';

import ReadTransactionService from '@modules/transactions/services/ReadTransactionService';
import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';
import DeleteTransactionService from '@modules/transactions/services/DeleteTransactionService';

export default class TransactionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const readTransaction = container.resolve(ReadTransactionService);

    const transactions = await readTransaction.execute();

    return response.json(transactions);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, value, type, category } = request.body;

    const createCategory = container.resolve(CreateCategoryService);
    const createTransaction = container.resolve(CreateTransactionService);

    const findOrCreateCategory = await createCategory.execute({
      title: category,
    });

    const transaction = await createTransaction.execute({
      title,
      value,
      type,
      category: findOrCreateCategory.id,
    });

    return response.json(transaction);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTransaction = container.resolve(DeleteTransactionService);

    deleteTransaction.execute(id);

    return response.status(204).send();
  }
}
