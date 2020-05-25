import 'reflect-metadata';

import DeleteTransactionService from './DeleteTransactionService';
import CreateTransactionService from './CreateTransactionService';
import FakeTransactionsRepository from '../repositories/fakes/FakeTransactionsRepository';

describe('DeleteTransaction', () => {
  it('should be able to create new transaction', async () => {
    const fakeTransactionsRepository = new FakeTransactionsRepository();

    const deleteTransaction = new DeleteTransactionService(
      fakeTransactionsRepository,
    );

    const createTransaction = new CreateTransactionService(
      fakeTransactionsRepository,
    );

    const transaction = await createTransaction.execute({
      title: 'salário',
      value: 3000,
      type: 'entrada',
      category: 'funcionario',
    });

    deleteTransaction.execute(transaction.id);

    expect(transaction).toHaveProperty('id');
  });
});
